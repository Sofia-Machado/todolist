import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  Button, Toolbar, Typography } from '@mui/material';

const NavbarComponent = ({login, setLogin}) => {

    const location = useLocation();
    const navigate = useNavigate();
    

    return ( 
        <>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {login &&
                <Link to='/about' size="small">About</Link>
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
            <Button variant="outlined" size="small" 
            onClick={() => {
                console.log(location.pathname)
                if (location.pathname === 'about') {
                    navigate('/');
                }
                setLogin(false);
            }}>
            Logout
            </Button>
            }
        </Toolbar>
        </>
     );
}
 
export default NavbarComponent;