import Button from '@mui/material/Button';

function AccountProfilePage() {
  return (
    <>
      <h4 className="main-heading">Profile</h4>
      <div className="tab-content-card">
        <form action="">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h5 className="heading-sm">Edit Profile</h5>
              <label htmlFor="firstName" className="mb-4 block">
                <p className="label">First Name</p>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="field"
                />
              </label>
              <label htmlFor="phoneNumber" className="mb-4 block">
                <p className="label">Phone Number</p>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="field"
                />
              </label>
              <label htmlFor="postalCode" className="mb-4 block">
                <p className="label">Postal Code</p>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  className="field"
                />
              </label>
              <label htmlFor="lastName" className="mb-4 block">
                <p className="label">Last Name</p>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="field"
                />
              </label>
              <label htmlFor="email" className="mb-0">
                <p className="label">Email Address</p>
                <input type="email" id="email" name="email" className="field" />
              </label>
            </div>
            <div>
              <h5 className="heading-sm">Change Password</h5>
              <label htmlFor="currentPassword" className="mb-4 block">
                <p className="label">Current Password</p>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="field"
                />
              </label>
              <label htmlFor="newPassword" className="mb-4 block">
                <p className="label">New Password</p>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="field"
                />
              </label>
              <label htmlFor="verifyPassword" className="mb-6 block">
                <p className="label">WVerify Password</p>
                <input
                  type="password"
                  id="verifyPassword"
                  name="verifyPassword"
                  className="field"
                />
              </label>
              <Button color="inherit" className="btn-submit">
                Edit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AccountProfilePage;
