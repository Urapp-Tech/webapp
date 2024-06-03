/* eslint-disable react/no-danger */
import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import {
  fetchBanners,
  setSingleBanners,
} from '../../redux/features/bannerSlice';
import CustomHeader from '../../components/common/CustomHeader';
import Loader from '../../components/common/Loader';

function OfferDetails() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { single_banner, banners, loading } = useAppSelector(
    (x) => x.bannerState
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id && banners) {
      const banner = banners.find((x) => x.id === id);
      if (banner) {
        dispatch(setSingleBanners(banner));
      }
    }
  }, [id, banners]);

  useEffect(() => {
    if (banners.length === 0) {
      dispatch(fetchBanners());
    }
  }, [banners]);

  return loading ? (
    <Loader />
  ) : (
    <div className="cs-dialog container mx-auto mt-5 w-full rounded-lg px-4 py-5 ">
      <CustomHeader title="Offer Details" isNestedRoute />
      <div className="grid grid-cols-12 gap-8 bg-white shadow-xl  xl:gap-4">
        <div className="col-span-12 rounded-xl p-10  md:col-span-7">
          <h1 className="h1 block text-6xl font-bold text-primary">
            {single_banner?.name}
          </h1>
          <p>{single_banner?.shortDesc}</p>
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: `${single_banner?.pageDetail}` }}
          />
        </div>
        <div className="col-span-5">
          <div className="m-auto my-5 h-[266px] ">
            <img
              alt="rating-detail"
              className="h-full w-full object-contain"
              src={single_banner?.banner}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(OfferDetails);
