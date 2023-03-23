import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        To do List
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login ({login, setLogin}) {
    
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);


    function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let user = ({
            email: data.get("email"),
            password: data.get("password")
        })

         fetch('http://localhost:8000/users/')
            .then(res => res.json())
            .then(data => {
                let newData = data.filter(dataUser => (dataUser.email === user.email || dataUser.password === user.password));
                //check values equality for errors
              
                //match logins and change component with setState
                if (newData.length > 0) {
                    newData.map(data => {
                        if (data.password !== user.password) {
                            return setValidPassword(false)
                        } 
                        if (data.email !== user.email) {
                            return setValidEmail(false)
                        } else {

                            return setLogin(true);
                        }
                    })
                    
                    console.log(newData)
                   // setLogin(true)
                }
            })
            .catch(error => {
                console.log(error)
                return error
            })
    };

    return (
        <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={!validEmail ? "Insert a valid email" : ""}
                    //value={valueEmail}
                    error={!validEmail}
                    autoFocus
                />
                  <TextField
                    label="Password"
                    required
                    value={value}
                    type="password"
                    onChange={(e) => setValue(e.target.value)}
                    />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={!validPassword ? "Insert a valid password" : ""}
                    //value={valuePassword}
                    error={!validPassword}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    );
}
       

export default Login;
