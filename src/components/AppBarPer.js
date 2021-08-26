import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../common/estilos';
import { Button, SwipeableDrawer } from '@material-ui/core';
import { Link } from "react-router-dom"
import { doLogout } from '../actions/auth';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';






export const AppBarPer = () => {

    const auth = localStorage.getItem('is-auth');
    let grupoID = localStorage.getItem('grupo-id');

    const dispatch = useDispatch()

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const handleLogout = () => {
        dispatch(doLogout());
        return (<Redirect to="/" />)
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const drawer = () => (
        <div>
            <List>
                <Typography component="h4" variant="h4" color="inherit" noWrap className={classes.title}>
                    IClounic - Clinica en linea
                </Typography>

                {grupoID === '1' ?
                    (<>
                        <Divider variant="middle" />

                        <Link to="/registro">
                            <Button className={classes.title}>
                                Registro Usuario
                            </Button>
                        </Link>

                        <Divider variant="middle" />

                        <Link to="/registro-doc">
                            <Button className={classes.title}>
                                Registro Doctor
                            </Button>
                        </Link>

                        <Divider variant="middle" />

                        <Link to="/lista">
                            <Button className={classes.title}>
                                Listar Solicitudes
                            </Button>
                        </Link>
                    </>) : null}

                {grupoID === '2' ?
                    (
                        <>
                            <Divider variant="middle" />

                            <Link to="/calendar">
                                <Button className={classes.title}>
                                    Calendario
                                </Button>
                            </Link>

                            <Divider variant="middle" />

                            <Link to="/reservas">
                                <Button className={classes.title}>
                                    Reservas
                                </Button>
                            </Link>
                        </>
                    ) : null}

                <Divider variant="middle" />


                <Link to="/perfil">
                    <Button className={classes.title}>
                        Perfil de usuario
                    </Button>
                </Link>



                <Divider variant="middle" />
            </List>
        </div>
    )



    return (
        <>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    {auth ? <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer('left', true)}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton> : null}
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        IClounic - Tu clinica en linea
                    </Typography>
                    {auth ? <IconButton color="inherit" onClick={handleLogout}>
                        <Badge color="secondary">
                            Cerrar Sesion
                        </Badge>
                    </IconButton> : null}
                </Toolbar>
            </AppBar>

            {auth ? <SwipeableDrawer
                anchor={'left'}
                open={state['left']}
                onClose={toggleDrawer('left', false)}
                onOpen={toggleDrawer('left', true)}
            >
                {drawer()}

            </SwipeableDrawer> : null}


        </>
    );
}