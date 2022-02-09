import {AppBar, Toolbar, Typography, makeStyles} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {useOktaAuth} from "@okta/okta-react";

const useStyles = makeStyles({
    component: {
        backgroundColor: '#FFFFFF',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        '& > *': {
            padding: 20
        }
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    }
});
const Header = () => {
    const classes = useStyles();
    const {oktaAuth, authState} = useOktaAuth();
    const history = useHistory();

    if (authState && authState.isPending) return null;

    const login = async () => history.push('/login');
    const logout = async () => oktaAuth.signOut();

    const button = authState.isAuthenticated ?
        <button
            onClick={logout}
            style={{
                background: 'unset',
                border: 'none',
                textTransform: 'uppercase',
                fontFamily: 'Roboto',
                fontSize: 17,
                cursor: 'pointer',
                opacity: 0.8
            }}>
            Logout
        </button> :
        <button onClick={login}>Login</button>;

    return (
        <AppBar className={classes.component}>
            <Toolbar className={classes.container}>
                <Link to='/' className={classes.link}><Typography>HOME</Typography></Link>
                <Link to='/profile' className={classes.link}><Typography>PROFILE</Typography></Link>
                <Typography>ABOUT</Typography>
                <Typography>CONTACT</Typography>
                <Typography>{button}</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Header;