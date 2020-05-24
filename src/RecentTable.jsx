import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./RecentTable.css";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const RecentTable = (items) => {
  console.log(items);
  const classes = useStyles();
  console.log("siema");
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Album cover</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Songname</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>Preview</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.items.map((row) => (
            <TableRow key={row.track.id}>
              <TableCell component="th" scope="row">
                <img
                  className="artistCover"
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
                ></iframe>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default RecentTable;
