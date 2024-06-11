import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { fetchBanners } from '../../redux/features/bannerSlice';
import { Banner } from '../../interfaces/banner';

type ProductOfferSwiperProps = {
  banners: Array<Banner>;
};

function ProductOfferSwiper({ banners }: ProductOfferSwiperProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const pagination = {
    clickable: true,
    renderBullet(index: number, className: any) {
      return `<span class="${className}"></span>`;
    },
  };

  const handleSlideClick = (banner: Banner) => {
    if (banner.link && banner.link.length > 0) {
      window.open(banner.link, '_blank');
    } else if (banner.pageDetail && banner.pageDetail.length > 0) {
      navigate(`/dashboard/products/offer/${banner.id}`);
    }
  };

  useEffect(() => {
    if (banners.length === 0) {
      dispatch(fetchBanners());
    }
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
          <SwiperSlide
            key={banner.id}
            className={`${
              (banner.link && banner.link.length > 0) ||
              (banner.pageDetail && banner.pageDetail.length > 0)
                ? ' cursor-pointer'
                : ''
            }`}
            onClick={() => handleSlideClick(banner)}
          >
            <img
              src={banner.banner}
              alt={banner.name}
              className="h-[400px] rounded-3xl"
            />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
export default ProductOfferSwiper;
