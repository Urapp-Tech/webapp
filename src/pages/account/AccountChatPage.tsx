import Button from '@mui/material/Button';

function AccountChatPage() {
  return (
    <>
      <h4 className="main-heading">
        Chat With Us
      </h4>
      <div className="tab-content-card">
        <div className="flex mb-4">
          <div className="w-4/12">
            <label htmlFor="issue" className="block">
              <p className="label">Select An Issue</p>
              <select id="issue" name="issue" className="field" defaultValue="DROP_OFF">
                <option value="DROP_OFF">Drop Off</option>
              </select>
            </label>
          </div>
        </div>
        <label htmlFor="message" className="block mb-4">
          <p className="label">Your Message</p>
          <textarea rows={5} id="message" name="message" className="field"
          />
        </label>
        <div className="flex justify-end">
          <div className="w-6/12">
            <Button color="inherit" className="btn-submit">Send</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AccountChatPage;
