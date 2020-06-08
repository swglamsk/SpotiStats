import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { FormatListNumbered, Folder, TrendingUp } from '@material-ui/icons';

const useStyles = makeStyles({
    gridInfo: {
        borderTop: '2px solid black',
        paddingTop: 10,
        paddingBottom: 30,
        width: '100%',
        marginBottom: 0,
        marginTop: 'auto',
        textAlign: 'justify',
        background: 'black',
        
    },
    gridItem: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
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
        border: '1px solid white',
        borderRadius: '50%',
        padding: 8,
        color: 'white',
    },
    gridText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
        color: 'white',
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
                        <a href="/recent">Recent Tracks List</a>
                    </div>
                </div>
                <div>
                    List your recently played songs
                </div>
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
                <div className={classes.gridItemChild}>
                    <div className={classes.gridIcon}>
                        <Folder fontSize="inherit" />
                    </div>
                    <div className={classes.gridText}>
                        <a href="/top-artists">Top Albums and Artists </a>
                    </div>
                </div>
                <div>
                    See your favorite songs and artists based on calculated affinity.
                </div>
            </Grid>
            <Grid item xs={3} className={classes.gridItem}>
                <div className={classes.gridItemChild}>
                    <div className={classes.gridIcon}>
                        <TrendingUp fontSize="inherit" />
                    </div>
                    <div className={classes.gridText}>
                        <a href="/compare-artists">Compare artists</a>
                    </div>
                </div>
                <div>
                    Compare artists based on total followers or recent popularity.
                </div>
            </Grid>
        </Grid>
    );
};
