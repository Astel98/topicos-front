import React from 'react';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { useStyles } from '../common/estilos'
import { Lista } from './solicitud/Lista';
import { Perfil } from './user/Perfil';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}





export const Main = () => {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <>
            <Perfil />
        </>
        // <div className={classes.root}>

        //     <main className={classes.content}>
        //         <div className={classes.appBarSpacer} />
        //         <Container maxWidth="lg" className={classes.container}>
        //             <Grid container spacing={3}>

        //                 {/* Chart */}
        //                 <Grid item xs={12} md={8} lg={9}>

        //                 </Grid>

        //             </Grid>
        // <Box pt={4}>
        //     <Copyright />
        // </Box>
        //         </Container>
        //     </main>
        // </div>
    );
}