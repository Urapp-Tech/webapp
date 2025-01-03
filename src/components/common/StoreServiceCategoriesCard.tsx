import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Category } from '../../interfaces/serviceCategory.interface';
import cn from '../../utilities/class-names';

interface StoreServiceCategoriesCardProps {
  categories: Category[];
  selectedCategory?: Category | null;
  onClick: (categoryId: string) => void;
}
function StoreServiceCategoriesCard({
  categories,
  selectedCategory,
  onClick,
}: StoreServiceCategoriesCardProps) {
  const colorArray = [
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
          1500: {
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
        {categories.map((category: Category, index: number) => (
          <SwiperSlide className="categories-list" key={index}>
            <button
              type="button"
              onClick={() => onClick(category.id)}
              key={category.id}
              className={cn(
                'relative flex min-h-[150px] min-w-[200px] max-w-[210px] items-center justify-between rounded-[0.625rem] transition-all duration-[0.2s] xl:pl-6',
                { 'active shadow-lg': selectedCategory?.id === category?.id }
              )}
              style={{
                background: colorArray[index % colorArray.length],
              }}
            >
              <h3 className="xs:text-sm truncate px-2 text-left font-semibold capitalize">
                {category.name}
              </h3>
              <div className="relative -right-2.5 w-[100px] max-w-[90px]">
                <img className="h-auto w-full" src={category.avatar} alt="" />
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

export default StoreServiceCategoriesCard;
