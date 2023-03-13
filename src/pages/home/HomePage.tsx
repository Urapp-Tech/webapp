import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

import { useState } from 'react';
import assets from '../../assets';
import HomePagePopup from './HomePagePopup';

const categories = [
  {
    id: 1,
    name: 'Dry Cleaning',
    image: assets.tempImages.dryCleaning,
  },
  {
    id: 2,
    name: 'Wash & Fold',
    image: assets.tempImages.laundry,
  },
  {
    id: 3,
    name: 'Commercial',
    image: assets.tempImages.curtain,
  },
  {
    id: 4,
    name: 'Outdoor Wear',
    image: assets.tempImages.jacket,
  },
  {
    id: 5,
    name: 'Carpet',
    image: assets.tempImages.carpet,
  },
  {
    id: 6,
    name: 'Iron',
    image: assets.tempImages.ironing,
  },
];

const items = [
  {
    id: 1,
    name: 'Baseball Jacket',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 2,
    name: 'Seven Star Jacket',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 3,
    name: 'Pants',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 4,
    name: 'Grey Neck Scarf',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 5,
    name: 'Printed T-shirt',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 6,
    name: 'White Fairy Blouse',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 7,
    name: 'Baseball Jacket',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 8,
    name: 'Seven Star Jacket',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 9,
    name: 'Pants',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
  {
    id: 10,
    name: 'Grey Neck Scarf',
    price: 15.0,
    image: assets.tempImages.itemPlaceholderImage,
  },
];

function getCategoryClasses(isActive: boolean) {
  const classes = [
    'relative',
    'flex',
    'flex-col',
    'items-center',
    'justify-center',
    'rounded-xl',
    'bg-gray-50',
    'py-4',
    'shadow-md',
  ];
  if (isActive) {
    classes.push('outline');
    classes.push('outline-2');
    classes.push('outline-neutral-900');
  }
  return classes.join(' ');
}

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <HomePagePopup
        open={dialogOpen}
        setOpen={setDialogOpen}
        data={{ test: 'abcd' }}
      />
      <div className="container px-5 py-5">
        <div className="font-open-sans text-2xl font-semibold text-neutral-900">
          Categories
        </div>
        <div className="mt-5 mb-10 grid w-full grid-cols-[repeat(auto-fill,_10rem)] gap-6">
          {categories.map((category) => (
            <button
              type="button"
              onClick={() => setSelectedCategory(category)}
              key={category.id}
              className={getCategoryClasses(
                category.id === selectedCategory.id
              )}
            >
              <img
                src={category.image}
                alt=""
                className="mb-4 aspect-square w-24 object-contain"
              />
              <div className="text-center font-open-sans text-base font-semibold text-neutral-900">
                {category.name}
              </div>
              {category.id === selectedCategory.id ? (
                <div className="absolute -bottom-3 left-[calc(50%_-_0.625rem)] z-10 aspect-square w-5 rotate-45 border-2 border-t-0 border-l-0 border-solid border-neutral-900 bg-gray-50" />
              ) : null}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className=" font-open-sans text-2xl font-semibold text-neutral-900">
            {selectedCategory.name}
          </div>

          <FormControl className="w-96 rounded-xl bg-gray-50 shadow-md">
            <InputLabel
              className="p-0 font-open-sans text-sm font-normal text-neutral-500"
              htmlFor="search"
            >
              Search
            </InputLabel>
            <Input
              className="m-0 p-3 font-open-sans text-base font-semibold text-neutral-900"
              id="search"
              type="text"
              disableUnderline
              endAdornment={
                <InputAdornment position="end">
                  <SearchOutlinedIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="mt-5 mb-10 grid w-full grid-cols-[repeat(auto-fill,_16rem)] gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative rounded-xl bg-gray-50">
              <img
                className="mb-2 w-full object-contain"
                src={item.image}
                alt=""
              />
              <div className="mx-4 mb-2 font-open-sans text-base font-semibold text-neutral-900">
                {item.name}
              </div>
              <div className="mx-4 mb-4 flex items-center justify-between">
                <div className="font-open-sans text-base font-semibold text-neutral-900">
                  $ {item.price.toFixed(2)}
                </div>
                <Button
                  className="rounded-xl bg-neutral-900 font-open-sans text-sm font-semibold text-gray-50"
                  variant="contained"
                  endIcon={<ShoppingBagOutlinedIcon />}
                  onClick={() => setDialogOpen(true)}
                >
                  Add
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HomePage;
