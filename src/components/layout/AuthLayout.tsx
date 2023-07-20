import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import assets from '../../assets';
import { useAppSelector } from '../../redux/redux-hooks';
import MainLayout from './MainLayout';
import { useEffect } from 'react';

function AuthLayout() {
  const auth = useAppSelector((state) => state.authState);
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.user) {
      navigate('/dashboard');
    }
  }, [auth.user]);
  return (
    <div className="auth-main">
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
