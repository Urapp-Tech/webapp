import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ProductCategory } from '../../interfaces/product';
import { useAppSelector } from '../../redux/redux-hooks';
import cn from '../../utilities/class-names';

interface ICategoryProps {
  categories: Array<ProductCategory>;
  onClick: (item: any) => void;
}

function CategoriesCard({ categories, onClick }: ICategoryProps) {
  const categoryColor = useAppSelector(
    (state) => state.appState.systemConfig?.theme.value.categoryColor
  );
  const colorArray = categoryColor || [
    '#E1CCEC',
    '#DFD3C3',
    '#C8D9EB',
    'rgba(200, 217, 223, 0.956863)',
    'rgba(217, 217, 217, 0.956863)',
    '#FFE2E2',
  ];
  return (
    <div className="categories-swiper-container">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
        }}
        breakpoints={{
          // Large screens
          1800: {
            slidesPerView: 5,
          },
          // Laptop screens
          1000: {
            slidesPerView: 4,
          },
          300: {
            slidesPerView: 2,
          },
        }}
        modules={[Navigation]}
        className="mySwiper custom-swiper"
      >
        {categories.length &&
          categories.map((category, index) => (
            <SwiperSlide className="categories-list" key={index}>
              <button
                type="button"
                onClick={() => onClick(category.id)}
                key={category.id}
                className={cn(
                  'relative flex min-h-[150px] min-w-[200px] max-w-[200px] items-center justify-between rounded-[0.625rem] py-3 pl-3 transition-all duration-[0.2s] xl:pl-6 2xl:min-w-[280px] 2xl:max-w-[280px]'
                  // { 'active shadow-lg': category.id === categories?.id }
                )}
                style={{
                  background: colorArray[index % colorArray.length],
                }}
              >
                <h3 className="max-w-[60%] truncate text-left text-sm font-semibold capitalize">
                  {category.name}
                </h3>
                <div className="relative -right-2.5 w-[100px] max-w-[90px]">
                  <img className="h-auto w-full" src={category.icon} alt="" />
                </div>
              </button>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="swiper-navigation-container">
        <div className="custom-swiper-button-prev">&#10094;</div>
        <div className="custom-swiper-button-next">&#10095;</div>
      </div>
    </div>
  );
}

export default CategoriesCard;
