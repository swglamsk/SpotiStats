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
            <TableCell>Name</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Popularity</TableCell>
            <TableCell>Followers</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.items.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.genres[0]}</TableCell>
              <TableCell>{row.popularity}</TableCell>
              <TableCell>{row.followers.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default ArtistsTable;