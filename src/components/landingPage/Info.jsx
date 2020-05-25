import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { FormatListNumbered, Folder, TrendingUp } from '@material-ui/icons';

const useStyles = makeStyles({
    gridInfo: {
        borderTop: '2px solid black',
        paddingTop: 10,
        width: '100%',
        marginBottom: 0,
        marginTop: 'auto',
        textAlign: 'justify',
        paddingBottom: 30
    },
    gridItem: {
        display: 'flex',
        flexDirection: 'column',
    },
    gridItemChild: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
    gridIcon: {
        display: 'flex',
        fontSize: 50,
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '50%',
        padding: 8,
    },
    gridText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
});

export const Info = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            className={classes.gridInfo}
            spacing={2}
            justify="center"
        >
            <Grid item xs={3} className={classes.gridItem}>
                <div className={classes.gridItemChild}>
                    <div className={classes.gridIcon}>
                        <FormatListNumbered fontSize="inherit" />
                    </div>
                    <div className={classes.gridText}>
                        <a href="#tracks">Recent Tracks List</a>
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet enim. Etiam ullamcorper.
                    Suspendisse a pellentesque dui, non felis. Maecenas
                    malesuada elit lectus felis, malesuada ultricies. Curabitur
                    et ligula. Ut molestie a, ultricies porta urna. Vestibulum
                </div>
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
                <div className={classes.gridItemChild}>
                    <div className={classes.gridIcon}>
                        <Folder fontSize="inherit" />
                    </div>
                    <div className={classes.gridText}>
                        <a href="#top">Top Albums and Artists </a>
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet enim. Etiam ullamcorper.
                    Suspendisse a pellentesque dui, non felis. Maecenas
                    malesuada elit lectus felis, malesuada ultricies. Curabitur
                    et ligula. Ut molestie a, ultricies porta urna. Vestibulum
                </div>
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
                <div className={classes.gridItemChild}>
                    <div className={classes.gridIcon}>
                        <TrendingUp fontSize="inherit" />
                    </div>
                    <div className={classes.gridText}>
                        <a href="#compare">Compare artists</a>
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet enim. Etiam ullamcorper.
                    Suspendisse a pellentesque dui, non felis. Maecenas
                    malesuada elit lectus felis, malesuada ultricies. Curabitur
                    et ligula. Ut molestie a, ultricies porta urna. Vestibulum
                </div>
            </Grid>
        </Grid>
    );
};
