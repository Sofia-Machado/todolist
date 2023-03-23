import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

const About = () => {

    return ( 
        <Paper
        >
            <Box
            />
            <Grid container>
                <Grid item md={6}>
                    <Box
                        sx={{
                        position: 'relative',
                        p: { xs: 3, md: 6 },
                        pr: { md: 0 },
                        }}
                    >
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        title
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                        description
                        </Typography>
                        <Link variant="subtitle1" href="#">
                        text
                        </Link>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}
 
export default About;