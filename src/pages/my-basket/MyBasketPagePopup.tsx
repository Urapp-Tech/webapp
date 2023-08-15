import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MyBasketPagePopupClasses from './MyBasketPagePopup.module.css';

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: {
    amount: number
    id: number
  }
}

function MyBasketPagePopup({ open, setOpen, data }: Props) {
  const onCloseHandler = (event: unknown, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false)
    }
  }
  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      className='modal-order-success'
    >
      <DialogContent className='modal-content'>
        <ThumbUpAltOutlinedIcon className="icon" />
        <h2 className="heading">$ {data.amount}</h2>
        <p className="desc">
          Payment has been done on behalf of ID: {data.id}
        </p>
      </DialogContent>
      <DialogActions className='modal-footer'>
      <Button
          onClick={() => setOpen(false)}
          className="btn-close"
          type="button"
          color="inherit"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default MyBasketPagePopup
