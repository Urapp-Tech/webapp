import { useCallback, useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ClearIcon from '@mui/icons-material/Clear'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import HomePagePopupClasses from './HomePagePopup.module.css'
import assets from '../../assets'
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks'
import { addToCart, Cart } from '../../redux/features/cartStateSlice'
import cartService from '../../services/cart'
import { getItem } from '../../utilities/local-storage'

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: any
  FAQs: any
}

function HomePagePopup({ open, setOpen, data, FAQs }: Props) {
  const [expanded, setExpanded] = useState<string | false>(false)
  const dispatch = useAppDispatch()
  const [count, setCount] = useState(1)
  const Cartdata = getItem('RegisteredCart')
  const arr: any = []

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false)
  }
  const incrementCount = () => {
    setCount((previousCount) => previousCount + 1)
  }
  const decrementCount = () => {
    setCount((previousCount) => {
      if (previousCount <= 1) {
        return 1
      }
      return previousCount - 1
    })
  }

  const addToBasketHandler = (CartData: any) => {
    dispatch(addToCart(CartData))
    arr.push(...arr, { id: CartData.id, quantity: CartData.quantity })
    const reqBody = {
      appUser: Cartdata?.appUser,
      appUserAddress: Cartdata?.appUserAddres,
      appUserDevice: Cartdata?.appUserDevice,
      cartId: Cartdata?.id,
      dropDateTime: Cartdata?.dropDateTime,
      pickupDateTime: Cartdata?.pickupDateTime,
      promoCode: Cartdata?.promoCode,
      tenant: Cartdata?.tenant,
      products: arr,
    }
    cartService
      .updateCart(reqBody)
      .then((response) => dispatch(Cart(response.data.data.cart)))
    setOpen(false)
    setCount(0)
  }
  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onClose={onCloseHandler} className="modal-add-to-cart">
      <IconButton onClick={() => setOpen(false)} className="btn-close">
        <ClearIcon />
      </IconButton>
      <DialogContent className="modal-content">
        <div className="main-grid">
          <div>
            <div className="product-img">
              <img src={data?.icon} alt="" />
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
            <div className="product-accordion">
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
              id: data?.id,
              image: data?.icon,
              name: data?.name,
              price: data?.price,
              quantity: count,
            }
            addToBasketHandler(cartItem)
          }}
        >
          Add to Basket
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default HomePagePopup
