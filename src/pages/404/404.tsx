import Button from '@mui/material/Button';
import assets from '../../assets';

function Page404() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F0F0F0]">
      <div className="container mx-auto flex items-center justify-between px-10">
        <div className="w-[50%]">
          <img
            alt="404 error"
            src={assets.images.speechBubble}
            className="mx-auto max-w-full object-contain"
          />
        </div>
        <div className="w-[50%]">
          <div className="mb-[10px] text-[25px] font-semibold uppercase leading-[normal] text-[#1a1a1a]">
            Looks like you&apos;re lost
          </div>
          <div className="mb-[30px] text-[18px] font-normal leading-[normal] text-[#1a1a1a] opacity-[0.3]">
            The page you are looking for not available!
          </div>
          <div className="flex items-center justify-start">
            <Button
              type="button"
              variant="contained"
              className="text-normal mr-5 w-[120px] bg-black py-[14px] text-[14px] leading-[normal] text-white"
            >
              Home
            </Button>

            <Button
              type="button"
              variant="contained"
              className="text-normal mr-5 w-[120px] bg-black py-[14px] text-[14px] leading-[normal] text-white"
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page404;
