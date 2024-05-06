import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { fetchBanners } from '../../redux/features/bannerSlice';

function ProductOfferSwiper() {
  const { banners } = useAppSelector((s) => s.bannerState);
  const dispatch = useAppDispatch();

  const pagination = {
    clickable: true,
    renderBullet(index: number, className: any) {
      return `<span class="${className}"></span>`;
    },
  };

  useEffect(() => {
    dispatch(fetchBanners());
  }, []);
  return (
    <Swiper
      slidesPerView={1}
      direction="horizontal"
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      spaceBetween={30}
      pagination={pagination}
      modules={[Pagination, Autoplay]}
      className="mySwiper custom-swiper "
    >
      {banners
        .filter((x) => x.bannerType === 'Slider')
        .map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.banner}
              alt={banner.name}
              className="rounded-3xl"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
export default ProductOfferSwiper;
