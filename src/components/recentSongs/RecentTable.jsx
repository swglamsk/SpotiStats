import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
        maxWidth: "80vw",
        margin: "auto",
    },
    artistCover: {
        width: 100,
        height: 100,
    },
});

const RecentTable = (items) => {
    const classes = useStyles();

    const tableHead = (
        <TableHead>
            <TableRow>
                <TableCell>Album cover</TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Songname</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Preview</TableCell>
            </TableRow>
        </TableHead>
    );

    const tableBody = (
        <TableBody>
            {items.items.map((row) => (
                <TableRow key={row.track.id}>
                    <TableCell component="th" scope="row">
                        <img
                            className={classes.artistCover}
                            src={row.track.album.images[0].url}
                            alt="pic"
                        />
                    </TableCell>
                    <TableCell>{row.track.artists[0].name}</TableCell>
                    <TableCell>{row.track.name}</TableCell>
                    <TableCell>{row.track.album.name}</TableCell>
                    <TableCell>
                        <iframe
                            src={`https://open.spotify.com/embed/track/${row.track.id}`}
                            width="250"
                            height="80"
                            frameborder="0"
                            allowtransparency="true"
                            allow="encrypted-media"
                            title="preview"
                        ></iframe>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                {tableHead}
                {tableBody}
            </Table>
        </TableContainer>
    );
};
export default RecentTable;
