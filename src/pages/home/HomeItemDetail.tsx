/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/no-unstable-nested-components */
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomHeader from '../../components/common/CustomHeader';
import Loader from '../../components/common/Loader';
import { addToCart } from '../../redux/features/cartStateSlice';
import { useLazyGetSubCategoryItemQuery } from '../../redux/features/categorySliceAPI';
import {
  useLazyGetAllRatingReviewsQuery,
  useLazyGetRatingStarListQuery,
} from '../../redux/features/ratingSliceAPI';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import HomeItemDetailAccordin from './HomeItemDetailAccordin';

dayjs.extend(relativeTime);

function HomeItemDetail() {
  const { itemId, menuId } = useLocation().state;
  const itemIdString = itemId?.toString();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const branch = useAppSelector((state) => state?.branchState?.branch);

  const [allRatingReviewTrigger, allRatingReviewResult] =
    useLazyGetAllRatingReviewsQuery();
  const [ratingStarListTrigger, ratingStarListResult] =
    useLazyGetRatingStarListQuery();
  const [subCategoryItemTrigger, subCategoryItemResult] =
    useLazyGetSubCategoryItemQuery();

  const { isLoading: isSubCategoryItemLoading, data: subCategoryItemData } =
    subCategoryItemResult;
  const { isLoading: isRatingStarListResult, data: ratingStarListData } =
    ratingStarListResult;
  const { isLoading: isAllRatingReviewResult, data: allRatingReviewData } =
    allRatingReviewResult;

  const [count, setCount] = useState(1);
  const [itemDetail, setItemDetail] = useState<any>(null);
  const [list, setList] = useState<any>([]);
  const [currentList, setCurrentList] = useState<any>([]);
  const [search] = useState<any>('');
  const [page, setPage] = useState(0);
  const [size] = React.useState(10);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (itemIdString) {
      subCategoryItemTrigger({
        branch: branch!.id,
        menuId,
        itemId,
      });
      ratingStarListTrigger(itemId);
      const res = allRatingReviewTrigger({ itemId, page, size }).then(
        (resp) => {
          if (resp.isSuccess) {
            setList(resp.data.data.list);
            setTotal(resp.data.data.total);
          }
        }
      );
    }
  }, []);

  const handleViewMore = async () => {
    const newPage = page + 1;
    setPage(newPage);
    await allRatingReviewTrigger({ itemId, page: newPage, size }).then(
      (resp) => {
        if (resp.isSuccess) {
          setList((prev: any) => [...prev, ...resp.data.data.list]);
        }
      }
    );
  };

  const handleViewLess = async () => {
    const newPage = page - 1;
    setPage(newPage);
    await allRatingReviewTrigger({ itemId, page: newPage, size }).then(
      (resp) => {
        if (resp.isSuccess) {
          setList(
            (prev: any) =>
              prev?.filter(
                (el: any) =>
                  !currentList.some((items: any) => items.id === el.id)
              )
          );
          setCurrentList(resp.data.data.list);
          setTotal(resp.data.data.total);
        }
      }
    );
  };

  const ratingText = useMemo(() => {
    const numerator = ratingStarListData?.data?.total ?? 0;
    const denominator = allRatingReviewData?.data?.total ?? 1;
    const num = Number(numerator / denominator);
    switch (true) {
      case num > 4 && num <= 5:
        return 'Very Good';
      case num <= 4 && num > 3.5:
        return 'Good';
      case num <= 3.5 && num > 2:
        return 'Average';
      case num <= 2 && num >= 0:
        return 'Below Average';
      default:
        return null;
    }
  }, [ratingStarListData, allRatingReviewData]);

  const ratingValue = useMemo(() => {
    const numerator = ratingStarListData?.data?.total ?? 0;
    const denominator = allRatingReviewData?.data?.total ?? 1;
    const num = Number(numerator / denominator);
    switch (true) {
      case num > 4 && num <= 5:
        return 5;
      case num <= 4 && num > 3.5:
        return 4;
      case num <= 3.5 && num > 2:
        return 3;
      case num <= 2 && num >= 0:
        return 2;
      default:
        return null;
    }
  }, [ratingStarListData, allRatingReviewData]);

  function LinearProgressWithLabel(
    props: LinearProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            style={{ height: '8px' }}
            variant="determinate"
            {...props}
          />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography
            variant="body2"
            style={{ fontWeight: 'bold' }}
            color="text.secondary"
          >{`${Math.round(props.value)}`}</Typography>
        </Box>
      </Box>
    );
  }

  const incrementCount = () => {
    setCount((previousCount) => previousCount + 1);
  };

  const decrementCount = () => {
    setCount((previousCount) => {
      if (previousCount <= 1) {
        return 1;
      }
      return previousCount - 1;
    });
  };

  const addToBasketHandler = (tempCartData: any) => {
    dispatch(addToCart(tempCartData));
  };

  return (
    <div className="cs-dialog container mx-auto mt-5 w-full rounded-lg px-4 py-5 ">
      <CustomHeader title="Item Details" isNestedRoute />
      <div className="grid grid-cols-12 gap-8 xl:gap-4">
        <div className="col-span-12 rounded-xl bg-white shadow-md xl:col-span-7 2xl:col-span-8">
          <div className="m-auto my-5 h-[266px] ">
            <img
              alt="rating-detail"
              className="h-full w-full object-contain"
              src={subCategoryItemData?.data.icon}
            />
          </div>
          <div className="mx-4 my-2">
            <div>
              <span className="text-3xl font-semibold">
                {subCategoryItemData?.data.name}
              </span>
            </div>
            <div>
              <span className="mt-3">{subCategoryItemData?.data.desc}</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="price">
                <span className="number">
                  $ <span>{subCategoryItemData?.data?.price}</span>
                </span>
                <span className="text">&nbsp;/ item</span>
              </div>
              <div className="flex items-center">
                <IconButton onClick={decrementCount} className="btn-decrement">
                  <RemoveCircleOutlineOutlinedIcon className="icon" />
                </IconButton>
                <div className="number">{count < 10 ? `0${count}` : count}</div>
                <IconButton onClick={incrementCount} className="btn-increment">
                  <AddCircleOutlineOutlinedIcon className="icon" />
                </IconButton>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <Button
                className="btn-add rounded-[0.625rem] bg-primary text-sm font-semibold text-foreground sm:w-auto"
                variant="contained"
                onClick={() => {
                  const cartItem = {
                    ...subCategoryItemData.data,
                    buyCount: count,
                  };
                  addToBasketHandler(cartItem);
                }}
              >
                Add to Basket
              </Button>
            </div>
          </div>
        </div>
        <div className="col-span-12 rounded-xl bg-white p-3 shadow-md xl:col-span-5 2xl:col-span-4">
          <HomeItemDetailAccordin
            data={subCategoryItemData?.data.homeCatItemFaq}
          />
        </div>
      </div>
      <div className="mt-5 w-full rounded-xl bg-white p-5 shadow-md">
        <div className="my-5 grid grid-cols-12">
          <div className="xl:col-span-3 2xl:col-span-2">
            <div className="flex items-center">
              {total !== 0 ? (
                <>
                  <span className="text-4xl font-semibold">
                    {(Number(ratingStarListData?.data?.total) / total).toFixed(
                      2
                    )}
                  </span>
                  <div className="mx-4 flex items-center rounded-full bg-black px-4 text-white">
                    <div className="mb-1">
                      <StarOutlinedIcon
                        fontSize="small"
                        style={{ color: 'white' }}
                      />
                    </div>
                    <span className="mx-2 text-sm">{ratingText}</span>
                  </div>
                </>
              ) : null}
            </div>
            <div className="mt-2">
              <Rating
                name="half-rating-read"
                value={ratingValue}
                precision={0.5}
                readOnly
              />
              {/* <Rating name="read-only" value={} readOnly /> */}
            </div>
            <div className="text-[#6A6A6A]">
              {ratingStarListData?.data?.total ?? 0} Ratings
            </div>
            <div className="text-[#6A6A6A]">
              {allRatingReviewData?.data?.total} Reviews
            </div>
          </div>
          <div className="2xl:col-col-span-10 border-l-[1px] xl:col-span-9">
            <div>
              {ratingStarListData?.data?.list
                .slice(1)
                ?.reverse()
                ?.map((ratings: any, index: number) => {
                  return (
                    <div
                      className="mx-5 grid grid-cols-12 items-center"
                      key={index}
                    >
                      <div className="xl:col-span-2 2xl:col-span-1">
                        <Rating
                          name="half-rating-read"
                          value={Number(ratings?.star)}
                          precision={0.5}
                          readOnly
                        />
                      </div>
                      <div className="mx-10 xl:col-span-6 2xl:col-span-3">
                        <LinearProgressWithLabel value={ratings?.total} />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div>
          {isAllRatingReviewResult ? (
            <div className="flex items-center justify-center">
              <Loader type="spinner" />
            </div>
          ) : (
            list &&
            list.map((items: any, index: number) => {
              return (
                <div key={index}>
                  {index !== items.length - 1 && <Divider className="my-5" />}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Rating
                        name="half-rating-read"
                        value={Number(items?.star)}
                        precision={0.5}
                        readOnly
                      />
                      <span className="mx-3 text-sm font-normal text-[#6A6A6A]">
                        {items.appUser?.firstName} {items.appUser?.lastName}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm text-[#6A6A6A]">
                        {dayjs(items.createdDate).fromNow()}
                      </span>
                    </div>
                  </div>
                  <div className="my-1 w-[70%] text-sm font-normal">
                    <span>{items.review}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {list?.length < 1 ? <p>No Review Records</p> : null}
        <div className="mt-3 flex w-[100%] justify-end py-3">
          {list?.length > size && (
            <Button
              className="btn-add w-full rounded-[0.625rem] bg-primary text-sm font-semibold text-foreground sm:w-auto"
              variant="contained"
              onClick={handleViewLess}
            >
              View less
            </Button>
          )}
          {list?.length !== total && (
            <Button
              className="btn-add w-full rounded-[0.625rem] bg-primary text-sm font-semibold text-foreground sm:w-auto"
              variant="contained"
              onClick={handleViewMore}
            >
              View More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeItemDetail;
