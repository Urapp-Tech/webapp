import Button from '@mui/material/Button';

function AccountProfilePage() {
  return (
    <>
      <div className="mb-4 font-open-sans text-3xl font-semibold text-neutral-900">
        Profile
      </div>
      <div className="rounded-xl bg-gray-50 p-4 shadow-md">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="mb-2 font-open-sans text-xl font-semibold text-neutral-900">
              Edit Profile
            </div>
            <label htmlFor="firstName" className="mb-3 flex flex-col gap-1">
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                First Name
              </div>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
              />
            </label>
            <label htmlFor="phoneNumber" className="mb-3 flex flex-col gap-1">
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                Phone Number
              </div>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
              />
            </label>
            <label htmlFor="postalCode" className="mb-3 flex flex-col gap-1">
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                Postal Code
              </div>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
              />
            </label>
            <label htmlFor="lastName" className="mb-3 flex flex-col gap-1">
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                Last Name
              </div>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
              />
            </label>
            <label htmlFor="email" className="mb-3 flex flex-col gap-1">
              <div className="font-open-sans text-sm font-normal text-neutral-500">
                Email Address
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
              />
            </label>
          </div>
          <div className="font-open-sans text-xl font-semibold text-neutral-900">
            <div>
              <div className="mb-2 font-open-sans text-xl font-semibold text-neutral-900">
                Change Password
              </div>
              <label
                htmlFor="currentPassword"
                className="mb-3 flex flex-col gap-1"
              >
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  Current Password
                </div>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
                />
              </label>
              <label htmlFor="newPassword" className="mb-3 flex flex-col gap-1">
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  New Password
                </div>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
                />
              </label>
              <label
                htmlFor="verifyPassword"
                className="mb-5 flex flex-col gap-1"
              >
                <div className="font-open-sans text-sm font-normal text-neutral-500">
                  Verify Password
                </div>
                <input
                  type="password"
                  id="verifyPassword"
                  name="verifyPassword"
                  className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
                />
              </label>

              <Button
                color="inherit"
                className="w-full rounded-xl bg-neutral-900 py-2 font-open-sans text-base font-semibold text-gray-50"
              >
                Edit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountProfilePage;
