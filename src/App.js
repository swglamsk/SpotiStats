import React, { Component } from 'react';
import * as $ from "jquery";
import logo from './logo.svg';
import './App.css';
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import Player from "./Player";
import hash from "./hash";

import SpotifyWebApi from 'spotify-web-api-js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0
    };
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  
  async getCurrentlyPlaying(token) {
    // Make a call using the token
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    let current = await spotifyApi.getMyCurrentPlayingTrack();
    console.log(current);
    this.setState({item: current.item,
                  is_playing: current.is_playing,
                  progress_ms: current.progress_ms});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;
