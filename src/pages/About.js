import Paper from '@mui/material/Paper';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PriorityHigh } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    height: 25,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const About = () => {

    return ( 
        <Container maxWidth="l" sx={{marginTop: 2}}>
            <Paper>
                <Box
                    sx={{
                    p: { xs: 3, md: 6 },
                    textAlign: 'center'
                    }}
                >
                    <Box mb={5}>
                        <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                        About
                        </Typography>
                        <Typography variant="h5" color="inherit" paragraph>
                        Welcome back to your to do list.
                        </Typography>
                        <Typography variant="p" color="inherit" paragraph>
                        Here you can manage your tasks in order to be more productive.
                        </Typography>
                    </Box>
                    {/* Toolkit */}
                    <Divider />
                    <Typography component="h2" variant="h4" color="inherit" mt={5} gutterBottom>
                    Toolkit
                    </Typography>
                    <Grid container >
                        <Grid container justifyContent="center"spacing={1} mb={1} item>
                            <Grid item xs={1}>
                                <Item><PriorityHigh color='error'/></Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item>Sets task priority order</Item>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center"spacing={1} mb={1} item>
                            <Grid item xs={1}>
                                <Item><CheckIcon color='success' /></Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item>Sets task completed</Item>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="center"spacing={1} mb={1} item>
                            <Grid item xs={1}>
                                <Item><CloseIcon color='error' /></Item>
                            </Grid>
                            <Grid item xs={3}>
                                <Item>Deletes task</Item>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
 
export default About;