import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundImage: `url(${'/fondo.jpg'})`,
        backgroundSize: 'cover',
    },
    divLogin: {
        margin: 'auto',
        padding: '100px',
    },
    mainDiv: {
        margin: 'auto',
        padding: '100px',
        display: 'flex',
        flexFlow: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'auto',
        flexDirection: 'column'
    },
    calendarScreen: {
        margin: 'auto',
        padding: '100px',
        display: 'flex',
        flexFlow: 'column',
        height: '70vh',
        overflow: 'auto',
        flexDirection: 'column'
        
    },
    calendarPaperScreen: {
        margin: 'auto',
        display: 'flex',
        flexFlow: 'column',
        height: '70vh',
        backgroundColor: 'white',
        padding: theme.spacing(2),
        overflow: 'auto',
        flexDirection: 'column'
        
    },
    cardLogin: {
        boxShadow: '5px 5px #888888',
        padding: '20px',
        borderRadius: '15px',
        borderWidth: '1px',
        borderColor: 'black'
    },
    loginInput: {
        padding: '5px 5px 55px 5px',
        margin: '5px',  
    },
    button: {
        paddingLeft: '100px',
        paddingRight: '100px',
    },
    botText: {
        padding: '10px',
        textAlign: 'center',
        color: '#888888',
    },
    margin: {
        paddingTop: '100px',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));
