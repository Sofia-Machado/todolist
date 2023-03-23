import {  Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const NavbarComponent = ({login}) => {
    return ( 
        <>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {login &&
                <Button size="small">Subscribe</Button>
            }
            <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
            >
            Todo List
            </Typography>
            {login &&
            <Button variant="outlined" size="small">
            Logout
            </Button>
            }
        </Toolbar>
        </>
     );
}
 
export default NavbarComponent;