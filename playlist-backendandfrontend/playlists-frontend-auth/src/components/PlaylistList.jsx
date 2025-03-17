import { Component } from "react";
import Playlist from "./Playlist";
import Section from "./Section";

const PlaylistList = ({ playlists, removePlaylist, like }) => {
  return (
    <div>
      <h3>Playlist List</h3>
        {playlists.map((playlist) => (
          <Section>
            <Playlist key={playlist.id} playlist={playlist} like={like} removePlaylist={removePlaylist}/> 
          </Section>
        ))}
    </div>
  );
};

export default PlaylistList;