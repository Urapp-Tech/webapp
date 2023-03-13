import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

function TopBar() {
  return (
    <AppBar
      position="fixed"
      className="w-full bg-neutral-900 text-gray-50 shadow-none"
    >
      <Toolbar className="ml-80">
        <div className=""> </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
