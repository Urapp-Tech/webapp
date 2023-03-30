import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MyBasketPagePopupClasses from './MyBasketPagePopup.module.css';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    amount: number;
    id: number;
  };
};

function MyBasketPagePopup({ open, setOpen, data }: Props) {
  const onCloseHandler = (event: unknown, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };
  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      PaperProps={{
        className: MyBasketPagePopupClasses.Dialog,
        style: { maxWidth: '100%', maxHeight: 'auto' },
      }}
    >
      <div className={MyBasketPagePopupClasses.Content}>
        <ThumbUpAltOutlinedIcon className={MyBasketPagePopupClasses.Icon} />
        <div className={MyBasketPagePopupClasses.Amount}>$ {data.amount}</div>
        <div className={MyBasketPagePopupClasses.Id}>
          Payment has been done on behalf of ID: {data.id}
        </div>
        <Button
          onClick={() => setOpen(false)}
          className={MyBasketPagePopupClasses.Button}
          type="button"
          color="inherit"
        >
          Close
        </Button>
      </div>
    </Dialog>
  );
}

export default MyBasketPagePopup;
