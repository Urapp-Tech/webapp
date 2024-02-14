import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { useCallback, useEffect, useState } from 'react';
import AlertBox from '../../components/common/SnackBar';
import useAlert from '../../hooks/alert.hook';
import { addToCart } from '../../redux/features/cartStateSlice';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import cartService, { UpdateCartPayload } from '../../services/cart.service';
import cn from '../../utilities/class-names';
import { getTenantId } from '../../utilities/constant';
import promiseHandler from '../../utilities/promise-handler';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  FAQs: any;
};

function HomePagePopup({ open, setOpen, data, FAQs }: Props) {
  console.log("data",data);
  
  const {
    alertMessage,
    setAlertMessage,
    showAlert,
    setShowAlert,
    alertSeverity,
    setAlertSeverity,
  } = useAlert();

  const user = useAppSelector((state) => state.authState.user);
  const { cartData, cartItems } = useAppSelector((state) => state.cartState);
  const deviceData = useAppSelector((state) => state.deviceStates.deviceData);
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<string | false>(false);
  const [count, setCount] = useState(1);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
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
    console.log("tempCartData",tempCartData);
    dispatch(addToCart(tempCartData));
    setOpen(false);
    setCount(1);
  };

  const updateCart = useCallback(async () => {
    if (!cartData) {
      return;
    }
    if (!cartItems.length) {
      return;
    }
    const tempCartItems = cartItems.map((item) => ({
      id: item.id,
      quantity: item.buyCount,
    }));
    const updateCartPayload: UpdateCartPayload = {
      appUser: user?.id ?? null,
      appUserDevice: deviceData?.id ?? null,
      cartId: cartData.id,
      tenant: getTenantId(),
      products: tempCartItems,
      appUserAddress: undefined,
      pickupDateTime: undefined,
      dropDateTime: undefined,
      voucherCode: undefined,
    };
    const updateCartPromise = cartService.updateCart(updateCartPayload);
    const [updateCartResult, updateCartError] =
      await promiseHandler(updateCartPromise);
    if (!updateCartResult) {
      setAlertSeverity('error');
      setAlertMessage(updateCartError.message);
      setShowAlert(true);
      return;
    }
    if (!updateCartResult.data.success) {
      setAlertSeverity('error');
      setAlertMessage(updateCartResult.data.message);
      setShowAlert(true);
      return;
    }
    setAlertSeverity('success');
    setAlertMessage(updateCartResult.data.message);
    setShowAlert(true);
  }, [cartItems]);

  useEffect(() => {
    updateCart();
  }, []);

  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setCount(1);
      setOpen(false);
    }
  };

  if (!open) {
    return null;
  }

  return (
    <>
      <AlertBox
        msg={alertMessage}
        setSeverity={alertSeverity}
        alertOpen={showAlert}
        setAlertOpen={setShowAlert}
      />
      <Dialog
        open={open}
        onClose={onCloseHandler}
        className="modal-add-to-cart"
        classes={{
          paper: cn(
            'max-w-[56rem] overflow-y-visible rounded-xl shadow-md',
            'md:m-4 md:max-h-[calc(100%_-_2rem)]'
          ),
        }}
      >
        <IconButton
          onClick={() => {
            setCount(1);
            setOpen(false);
          }}
          className="absolute -top-3 right-[-15px] z-[1] flex h-11 w-11 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white hover:bg-primary"
        >
          <ClearIcon />
        </IconButton>
        <DialogContent className="modal-content">
          <div className="main-grid">
            <div>
              <div className="product-img">
                <img
                  className="aspect-square w-80 object-contain"
                  src={data?.icon}
                  alt=""
                />
              </div>
              <div className="p-4">
                <h4 className="product-name">{data?.name}</h4>
                <p className="product-desc">{data?.desc}</p>
                <div className="flex-container flex items-center justify-between">
                  <div className="price">
                    <h3 className="number">
                      $ <span>{data?.price.toFixed(2)}</span>
                    </h3>
                    <p className="text">&nbsp;/ item</p>
                  </div>
                  <div className="count">
                    <IconButton
                      onClick={decrementCount}
                      className="btn-decrement"
                    >
                      <RemoveCircleOutlineOutlinedIcon className="icon" />
                    </IconButton>

                    <div className="number">{count}</div>
                    <IconButton
                      onClick={incrementCount}
                      className="btn-increment"
                    >
                      <AddCircleOutlineOutlinedIcon className="icon" />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
            {FAQs?.map((faq: any, index: any) => (
              <div className="product-accordion" key={index}>
                <Accordion
                  key={index}
                  className="accordion-item"
                  expanded={expanded === `panel-${index}`}
                  onChange={handleChange(`panel-${index}`)}
                >
                  <AccordionSummary
                    className="accordion-header"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel-${index}-content`}
                    id={`panel-${index}-header`}
                  >
                    <h6 className="heading">{faq.question}</h6>
                  </AccordionSummary>
                  <AccordionDetails className="accordion-body">
                    <p className="desc">{faq.answer}</p>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions className="modal-footer">
          <Button
            className="btn-add"
            onClick={() => {
              const cartItem = {
                ...data,
                buyCount: count,
              };
              addToBasketHandler(cartItem);
            }}
          >
            Add to Basket
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default HomePagePopup;