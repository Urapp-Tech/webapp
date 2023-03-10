import { Outlet } from 'react-router-dom';
import assets from '../../assets';

function AuthLayout() {
  return (
    <div className="grid grid-cols-2">
      <Outlet />
      <div className="relative">
        <img
          className="absolute z-0 h-screen w-full object-cover"
          src={assets.images.bubbleBackground}
          alt=""
        />
        <div className="relative z-20 flex h-screen flex-col items-center justify-center">
          <div className="w-[28rem]">
            <div className="mb-4 font-open-sans text-6xl font-semibold text-gray-50">
              Join Our
              <br />
              Community
            </div>

            <div className="font-open-sans text-lg font-normal text-gray-50">
              Lorem ipusm dolor sit amet, coectetuer adipiscing elit sed diam
              nonummy et nibh euismod
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
