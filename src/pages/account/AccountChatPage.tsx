import Button from '@mui/material/Button';

function AccountChatPage() {
  return (
    <>
      <div className="mb-4 font-open-sans text-3xl font-semibold text-neutral-900">
        Chat With Us
      </div>
      <div className="rounded-xl bg-gray-50 p-4 shadow-md">
        <div className="flex flex-col gap-3">
          <label htmlFor="issue" className="flex w-1/2 flex-col gap-1">
            <div className="font-open-sans text-sm font-normal text-neutral-500">
              Select An Issue
            </div>
            <select
              id="issue"
              name="issue"
              className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
              defaultValue="DROP_OFF"
            >
              <option value="DROP_OFF">Drop Off</option>
            </select>
          </label>
          <label htmlFor="message" className="flex flex-col gap-1">
            <div className="font-open-sans text-sm font-normal text-neutral-500">
              Your Message
            </div>
            <textarea
              rows={5}
              id="message"
              name="message"
              className="rounded-md bg-gray-50 px-2 py-1 font-open-sans text-sm font-semibold text-neutral-900 outline outline-1 outline-neutral-300 focus:outline-neutral-900"
            />
          </label>
          <div className="flex w-full justify-end">
            <Button
              color="inherit"
              className="mt-3 rounded-xl bg-neutral-900 px-32 py-2 font-open-sans text-base font-semibold text-gray-50"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountChatPage;
