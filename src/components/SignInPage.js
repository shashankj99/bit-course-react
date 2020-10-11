import React from 'react';
import Typography from "@material-ui/core/Typography";
import Link from '@material-ui/core/Link';
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

function Copyright() {

    return (
        <Typography variant='body2' color='textSecondary' align='center'>
            {'Copyright © '}
            <Link color='inherit' href='https://bitcodenepal.com' target='_blank' rel='noreferrer'>
                BitCode Nepal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );

}

const useStyles = makeStyles((theme) => ({
    paper: {
        margin: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main
    }
}));

export default function SignIn() {

    const classes = useStyles();

    return (

        <Container component='main' maxWidth='xs'>

            <CssBaseline />

            <div className={classes.paper}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h3" variant="h6">
                    Sign In
                </Typography>

            </div>

            <Box mt={8}>
                <Copyright />
            </Box>

        </Container>

    );

}
