import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import Loader from '../../components/common/Loader';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import StoreServiceCategoriesCard from '../../components/common/StoreServiceCategoriesCard';
import {
  Category,
  StoreService,
} from '../../interfaces/serviceCategory.interface';
import {
  fetchCategories,
  setSelectedCategory,
} from '../../redux/features/storeCategorySlice';
import {
  fetchCategoriesItems,
  setSelectedCategoriesItem,
} from '../../redux/features/storeCategoryItemsSlice';

function HomePage() {
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const [searchName, setSearchName] = useState('');
  const { user } = useAppSelector((x) => x.authState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector(
    (state) => state.storeCategoryState
  );
  const { systemConfig } = useAppSelector((x) => x.appState);
  const { categoryItems, loading: isSubCategoryLoading } = useAppSelector(
    (state) => state.storeCategoryItemState
  );
  const [filteredCategoriesItems, setFilteredCategoriesItems] = useState<
    StoreService[]
  >([]);

  const selectCategory = (categoryId: string) => {
    const cat = categories.find((x) => x.id === categoryId);
    if (cat) {
      dispatch(setSelectedCategory(cat));
    }
  };

  useEffect(() => {
    dispatch(fetchCategories(systemConfig?.tenant));
  }, []);

  useEffect(() => {
    if (selectedCategory?.id) {
      dispatch(
        fetchCategoriesItems({
          tenant: systemConfig?.tenant,
          categoryId: selectedCategory.id,
        })
      );
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory?.id && categories.length > 0) {
      selectCategory(categories[0].id);
    }
  }, [categories]);

  const bookService = (itemId: string) => {
    const cat = categoryItems.find((x) => x.id === itemId);
    if (cat) {
      dispatch(setSelectedCategoriesItem(cat));
    }
    navigate('/dashboard/book-service');
  };

  const handleSearch = () => {
    if (searchName.length > 0) {
      const filtered = categoryItems.filter((x) =>
        x.name.toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredCategoriesItems(filtered);
    } else {
      setFilteredCategoriesItems(categoryItems);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [categoryItems, searchName]);

  return (
    <>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />

      <div className="bg-background px-4 pt-6 sm:px-5 sm:pt-4 xl:px-7">
        <div className="all-categories mb-8">
          <h4 className="mb-5 text-2xl font-semibold leading-tight text-secondary sm:mb-7 md:text-[1.375rem] md:font-bold">
            Services
          </h4>
          <StoreServiceCategoriesCard
            categories={categories}
            selectedCategory={selectedCategory}
            onClick={selectCategory}
          />
        </div>
        <div>
          <div className="mb-4 items-center justify-between sm:flex">
            <h4 className="mb-4 text-2xl font-semibold capitalize leading-tight text-secondary sm:mb-0">
              {selectedCategory?.name}
            </h4>
            <FormControl className="w-full max-w-[350px] rounded-[0.625rem] bg-white shadow-[2px_4px_6px_rgba(0,0,0,0.06)]">
              <Input
                className="m-0 gap-x-3 px-5 py-2 text-sm font-normal text-faded"
                id="search"
                type="text"
                inputProps={{
                  placeholder: 'Search',
                }}
                disableUnderline
                endAdornment={
                  <IconButton onClick={handleSearch}>
                    {' '}
                    <SearchOutlinedIcon />{' '}
                  </IconButton>
                }
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </FormControl>
          </div>
          <div className="mb-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {isSubCategoryLoading ? (
              <Loader />
            ) : (
              filteredCategoriesItems?.map((item: StoreService) => (
                <div
                  key={item.id}
                  className="relative rounded-[0.625rem] bg-white px-2.5 pb-2.5 pt-4 md:px-3.5 md:pt-5"
                >
                  <div>
                    <button
                      aria-label="Button to Click"
                      type="button"
                      className="mx-auto w-full max-w-[360px]"
                    >
                      <img
                        className="mx-auto mb-4 aspect-[4/3] h-full w-full cursor-pointer object-contain md:mb-6"
                        src={item.avatar}
                        alt=""
                      />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between">
                    <h5 className="mb-2 basis-full text-center text-base font-semibold capitalize leading-none text-secondary sm:mb-3 sm:text-left">
                      {item.name}
                    </h5>
                    <h6 className="mb-3 flex-1 basis-full text-center text-sm font-semibold text-secondary sm:mb-0 sm:flex sm:basis-0 sm:text-left">
                      {import.meta.env.VITE_CURRENCY_SYMBOL} {item.price}
                    </h6>
                    <Button
                      className="btn-add w-full rounded-[0.625rem] bg-primary text-sm font-semibold text-foreground sm:w-auto"
                      variant="contained"
                      // endIcon={<ShoppingBagOutlinedIcon />}
                      onClick={() => bookService(item.id)}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
