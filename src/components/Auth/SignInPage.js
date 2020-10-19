import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Formik} from 'formik';
import * as Yup from 'yup';
import {loginUser} from "../../actions/userActions";
import {Typography, Container, Avatar, CssBaseline, TextField, Link, Box, FormControlLabel, Checkbox,
Grid, Button} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://bitcodenepal.com/">
                BitCode Nepal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function SignInPage(props) {

    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem('remember_me') ? true : false;
    const [rememberMe, setRememberMe] = useState(rememberMeChecked);

    const handleRememberMe = () => {
        setRememberMe(!rememberMe);
    }

    const classes = useStyles();

    return (

        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string()
                    .email('Invalid Email !')
                    .required('Email is required !'),
                password: Yup.string()
                    .min(6, 'Password must be minimum six characters in length !')
                    .required('Password is required !')
            })}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {

                    let dataToSubmit = {
                        email: values.email,
                        password: values.password
                    }

                    dispatch(loginUser(dataToSubmit))
                        .then(response => {

                            if (response.payload.status === 200) {

                                localStorage.setItem('access_token', response.payload.bearer_token);

                                if (rememberMe === true)
                                    localStorage.setItem('remember_me', values.id);
                                else
                                    localStorage.removeItem('remember_me');

                                props.history.push('/');
                            } else
                                alert('Check Your Email and Password');

                        })
                        .catch(error => {
                            alert('Check out your email and password again');

                            setTimeout(() => {
                                alert("");
                            }, 3000);

                        });
                    setSubmitting(true);
                });
            }}
        >
            {props => {

                const {values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit} = props;

                return (

                    <Container component="main" maxWidth="xs">

                        <CssBaseline />

                        <div className={classes.paper}>

                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>

                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>

                            <form className={classes.form} onSubmit={handleSubmit}>

                                <TextField
                                    id="email"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="email"
                                    label='Email Address'
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={(errors.email && touched.email) ? true : false}
                                    helperText={(errors.email && touched.email) ? errors.email : ''}
                                />

                                <TextField
                                    id="password"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="password"
                                    label='Password'
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={(errors.password && touched.password) ? true : false}
                                    helperText={(errors.password && touched.password) ? errors.password : ''}
                                />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                            id="rememberMe"
                                            onChange={handleRememberMe}
                                            checked={rememberMe}
                                        />
                                    }
                                    label="Remember me"
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    disabled={isSubmitting}
                                    onSubmit={handleSubmit}
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

                            </form>

                            <Box mt={8}>
                                <Copyright />
                            </Box>

                        </div>
                    </Container>

                );
            }}
        </Formik>

    );
}

export default withRouter(SignInPage);
