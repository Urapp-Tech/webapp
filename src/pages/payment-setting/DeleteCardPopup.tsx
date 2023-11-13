import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteCardPopup({ open, setOpen }: Props) {
  const onCloseHandler = (event: object, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };
  return (
    <Dialog onClose={onCloseHandler} open={open} className="modal-delete-card">
      <DialogContent className="modal-content">
        <SentimentVeryDissatisfiedIcon className="icon" />
        <h2 className="heading">Hey Wait!</h2>
        <p className="desc">Are you sure you want to Delete this Card</p>
      </DialogContent>
      <DialogActions className="modal-footer">
        <Button
          onClick={() => setOpen(false)}
          className="btn-yes"
          type="button"
          color="inherit"
        >
          Yes
        </Button>
        <Button
          onClick={() => setOpen(false)}
          className="btn-no"
          type="button"
          color="inherit"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteCardPopup;
