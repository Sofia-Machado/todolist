import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  Button, Toolbar, Typography } from '@mui/material';

const NavbarComponent = ({login, setLogin}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    return ( 
        <>
        <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
            {login && <Link to={path !== '/about' ? 'about' : '/'} size="small">{path !== '/about' ? 'About' : 'To do List'}</Link>}
            <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            noWrap
            sx={{ flex: 1 }}
            >
            To Do List
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