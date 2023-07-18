import { useState } from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import HomePagePopup from './HomePagePopup';
import assets from '../../assets';
import SelectLocationPopup from './SelectLocationPopup';
import LocationPopup from './LocationPopup';
import SnackBar from '../../components/common/SnackBar';
import { AlertColor } from '@mui/material';

const categories = [
  {
    id: 1,
    name: 'Dry Cleaning',
    image: assets.tempImages.dryCleaning,
  },
  {
    id: 2,
    name: 'Commercial',
    image: assets.tempImages.curtain,
  },
  {
    id: 3,
    name: 'Outdoor Wear',
    image: assets.tempImages.jacket,
  },
  {
    id: 4,
    name: 'Iron',
    image: assets.tempImages.ironing,
  },
  {
    id: 5,
    name: 'Home',
    image: assets.tempImages.home,
  },
  {
    id: 6,
    name: 'Wash & Fold',
    image: assets.tempImages.laundry,
  },
];

const items = [
  {
    id: 1,
    name: 'Jacket',
    price: 12.0,
    image: assets.tempImages.jacket1,
  },
  {
    id: 2,
    name: 'Pants',
    price: 14.0,
    image: assets.tempImages.pants1,
  },
  {
    id: 3,
    name: 'Shirt',
    price: 16.0,
    image: assets.tempImages.shirt1,
  },
  {
    id: 4,
    name: 'Neck Scarf',
    price: 18.0,
    image: assets.tempImages.neckScarf1,
  },
  {
    id: 5,
    name: 'Printed T-shirt',
    price: 20.0,
    image: assets.tempImages.printedTShirt1,
  },
  {
    id: 6,
    name: 'Neck Scarf 2',
    price: 18.0,
    image: assets.tempImages.neckScarf1,
  },
  {
    id: 7,
    name: 'Printed T-shirt 2',
    price: 16.0,
    image: assets.tempImages.printedTShirt1,
  },
  {
    id: 8,
    name: 'Jacket 2',
    price: 14.0,
    image: assets.tempImages.jacket1,
  },
  {
    id: 9,
    name: 'Pants 2',
    price: 16.0,
    image: assets.tempImages.pants1,
  },
  {
    id: 10,
    name: 'Shirt 2',
    price: 18.0,
    image: assets.tempImages.shirt1,
  },
];

function getCategoryClasses(isActive: boolean) {
  const classes = 'item';

  if (isActive) {
    return `${classes} active shadow-lg`;
  }
  return classes;
}

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectLocationDialogOpen, setSelectLocationDialogOpen] =
    useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const addItemHandler = (item: any) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };
  return (
    <>
      {/* <HomePagePopup
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={selectedItem}
      />
      <LocationPopup
        open={selectLocationDialogOpen}
        setOpen={setSelectLocationDialogOpen}
      /> */}
      <div className="px-4 pt-6 sm:px-5 sm:pt-4 xl:px-7">
        <div className="all-categories">
          <h4 className="heading">Categories</h4>
          <div className="categories-list">
            {categories.map((category) => (
              <button
                type="button"
                onClick={() => setSelectedCategory(category)}
                key={category.id}
                className={getCategoryClasses(
                  category.id === selectedCategory.id
                )}
              >
                <h3 className="cat-name">{category.name}</h3>
                <div className="grow">
                  <img src={category.image} alt="" className="cat-img" />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="selected-categories">
          <div className="mb-4 items-center justify-between sm:flex">
            <h4 className="heading">{selectedCategory.name}</h4>
            <FormControl className="search-sub-cats">
              <Input
                className="field"
                id="search"
                type="text"
                inputProps={{
                  placeholder: 'Search',
                }}
                disableUnderline
                endAdornment={<SearchOutlinedIcon />}
              />
            </FormControl>
          </div>
          <div className="categories-list">
            {items.map((item) => (
              <div key={item.id} className="item">
                <img
                  className="mb-4 aspect-[4/3] w-full object-contain md:mb-6"
                  src={item.image}
                  alt=""
                />
                <div className="flex flex-wrap items-center justify-between">
                  <h5 className="name">{item.name}</h5>
                  <h6 className="price">$ {item.price.toFixed(2)}</h6>
                  <Button
                    className="btn-add"
                    variant="contained"
                    endIcon={<ShoppingBagOutlinedIcon />}
                    onClick={() => addItemHandler(item)}
                  >
                    Add
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
