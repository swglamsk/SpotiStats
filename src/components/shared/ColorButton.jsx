import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';

export const ColorButton = withStyles((theme) => ({
    root: {
        boxShadow: theme.shadows[5],
        color: 'white',
        backgroundColor: green[500],
        width: 250,
        '&:hover': {
            backgroundColor: green[700],
        },
    },
}))(Button);
