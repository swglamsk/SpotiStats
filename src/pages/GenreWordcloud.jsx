import * as React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getToken } from "../store/token/selectors";
import { makeStyles } from "@material-ui/core/styles";
import SpotifyWebApi from "spotify-web-api-js";
import ReactWordcloud from "react-wordcloud";

const useStyles = makeStyles({
  root: {
    paddingTop: 100,
  },
});
const options = {
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontSizes: [5, 60],
  fontStyle: "normal",
  fontWeight: "normal",
  padding: 1,
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
  transitionDuration: 1000,
};
const GenreWordcloud = () => {
  const classes = useStyles();

  const [items, setItems] = React.useState(null);
  const [dict, setDict] = React.useState(null);
  const token = useSelector((state) => getToken(state));

  React.useEffect(() => {
    console.log(token);
    const getTopArtists = async () => {
      let spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      let artists = await spotifyApi.getMyTopArtists({ limit: "50" });
      setItems(artists.items);
      makeDictionary();
    };
    function makeDictionary() {
      if (!items) return;

      const dictCopy = new Map();
      items.forEach((track) => {
        console.log(track);
        track.genres.forEach((genre) => {
          addOccurence(dictCopy, genre);
        });
      });
      setDict(dictCopy);
    }

    if (token) {
      getTopArtists();
    }
  }, [token, items]);

  function addOccurence(map, word) {
    if (map.has(word)) {
      map.set(word, map.get(word) + 1);
    } else map.set(word, 1);
  }

  function getDictionary(map) {
    if (!map) return;

    const formatted = [];
    for (let [key, value] of map.entries()) {
      formatted.push({ text: key, value });
    }
    return formatted;
  }

  console.log(dict);
  return (
    <div className={classes.root}>
      <ReactWordcloud options={options} words={getDictionary(dict)} />
    </div>
  );
};
export default GenreWordcloud;
