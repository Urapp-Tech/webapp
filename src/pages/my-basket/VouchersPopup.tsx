import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Voucher } from '../../types/voucher.types';
import cn from '../../utilities/class-names';

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  vouchers: Array<Voucher>;
  handleVoucherSelect: (code: string) => void;
};

function VouchersPopup({
  open,
  setOpen,
  vouchers,
  handleVoucherSelect,
}: Props) {
  const onCloseHandler = (event: unknown, reason: string) => {
    if (reason === 'backdropClick') {
      setOpen(false);
    }
  };

  return (
    <Dialog
      onClose={onCloseHandler}
      open={open}
      classes={{ paper: cn('m-4 w-full max-w-sm rounded-xl shadow-md') }}
      slotProps={{
        backdrop: {
          classes: {
            root: cn('backdrop-blur-xl'),
          },
        },
      }}
    >
      <DialogContent className="px-5 pb-5 pt-10 text-center">
        <p className="mb-0 px-2 text-base font-semibold text-zinc-900  sm:px-4">
          Select Voucher
        </p>
      </DialogContent>
      <DialogActions className="gap-x-5 p-5">
        <div className="flex w-full flex-col gap-y-4 ">
          {vouchers.map((voucher) => (
            <button
              type="button"
              key={voucher.id}
              onClick={() => handleVoucherSelect(voucher.voucherCode)}
              className="mr-2 flex items-center justify-between rounded-lg border border-black p-4 text-start"
            >
              <div className="grow text-base text-black">
                {voucher.voucherCode}
              </div>
              <div className="font-bold">{voucher.value}</div>
            </button>
          ))}
        </div>
      </DialogActions>
    </Dialog>
  );
}

export default VouchersPopup;
