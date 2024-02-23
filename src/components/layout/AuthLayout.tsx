import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="auth-mainS bg-super-admin-auth-background h-screen bg-[#f0f0f0]">
   
      <Outlet />
      {/* <div className="join-community login-community">
        <div className="content-container">
          <div className="content">
            <h1 className="heading">Join Our Community</h1>
            <p className="desc">
              Lorem ipusm dolor sit amet, coectetuer adipiscing elit sed diam
              nonummy et nibh euismod
            </p>
          </div>
          <img
            className=""
            src={assets.images.loginImage}
            alt=""
          />
        </div>
      </div> */}
    </div>
  );
}

export default AuthLayout;
