import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./RecentTable.css"

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
});

const ArtistsTable = (items) => {
  console.log(items);
  const classes = useStyles();
  console.log("poopek");
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Photo</TableCell>
            <TableCell>Name</TableCell>
            //<TableCell>Songname</TableCell>
            //<TableCell>Album</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.items.map((row) => (
            <TableRow key={row.artists.name}>
                
              <TableCell component="th" scope="row">
                <img className="artistPhoto" src={row.artist.images[0].url} alt='pic'/>
              </TableCell>
              <TableCell>{row.track.artists[0].name}</TableCell>
              //<TableCell>{row.track.name}</TableCell>
              //<TableCell>{row.track.album.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ArtistsTable;