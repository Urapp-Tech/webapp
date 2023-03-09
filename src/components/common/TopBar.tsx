import { AppBar, Toolbar, Typography } from '@mui/material';
import colorConfigs from '../../configs/colorConfigs';
import sizeConfigs from '../../configs/sizeConfigs';

function TopBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: 'unset',
        backgroundColor: colorConfigs.topBar.bg,
        color: colorConfigs.topBar.color,
      }}
    >
      <Toolbar>
        <div> </div>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
