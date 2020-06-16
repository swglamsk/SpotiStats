import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // width: 700,
        margin: "auto",
        paddingTop: 20,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: "center",
        width: 200,
        height: 200,
    },
    element: {
        flexDirection: "column",
    },
    elementText: {
        marginTop: 8,
        width: 180,
        height: 20,
        textOverflow: "ellipsis",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
}));

export const TopDisplayGrid = ({ list }) => {
    const classes = useStyles();

    const element = (element) => {
        const imageUrl = element.images
            ? element.images[0].url
            : element.album.images[0].url;

        return (
            <Paper className={classes.paper}>
                <div className={classes.element}>
                    <img src={imageUrl} height={150} width={150} alt="img" />
                    <div className={classes.elementText}>{element.name}</div>
                </div>
            </Paper>
        );
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                {list.map((elem) => (
                    <Grid item xs={6} md={4}>
                        {element(elem)}
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
