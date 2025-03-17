import "./App.css";

import { useState, useEffect } from "react";
import Playlist from "./components/Playlist";
import playlistService from "./services/playlistService";
import PlaylistForm from "./components/PlaylistForm";
import PlaylistList from "./components/PlaylistList";
import LoginForm from "./components/Loginform";
import Section from "./components/Section";
import Notification from "./components/Notification";

import loginService from "./services/login";
import GreetingLogout from "./components/GreetingLogout";

const App = () => {
  const [playlists, setPlaylists] = useState([]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [userObject, setUserObject] = useState(null);

  const [notification, setNotification] = useState(null);



  const [playlistName, setPlaylistName] = useState("");
  const [creator, setCreator] = useState("");
  const [numberOfSongs, setNumberOfSongs] = useState(0);
  const [likes, setLikes] = useState(0);



  useEffect(() => {
    playlistService.getPlaylists().then((playlists) => setPlaylists(playlists));
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserObject(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setNotification({ message: "Login Successfull", type: "info" });
      setUserObject(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      setNotification({ message: "Invalid Credentials", type: "warning" });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setUsername("");
    setPassword("");
  };

  const like = async (playlistId) => {
    const { newLikes } = await playlistService.likePlaylist(playlistId, userObject.token);
    setPlaylists(playlists.map((playlist) => (playlist.id === playlistId ? { ...playlist, likes: newLikes } :
      playlist)));
  }

  const removePlaylist = async (playlistId) => {
    await playlistService.deletePlaylist(playlistId, userObject.token);
    setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId)); 
  }
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserObject(null);
  };

  const handlePlaylist = async (event) => {
    event.preventDefault();
    try {
      const playlistObject = {
        name: playlistName,
        creator,
        numOfSongs: numberOfSongs,
        likes,
    };
      const createdPlaylist = await playlistService.createPlaylist(playlistObject, userObject.token);
      setPlaylists(playlists.concat(createdPlaylist));
      setNotification({ message: "Playlist Added Successfully", type: "info" });
    } catch (error) {
      setNotification({ message: "Invalid Playlist", type: "warning" });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setPlaylistName("");
    setCreator("");
    setNumberOfSongs(0);
    setLikes(0);
  };

  return (
    <div>
      <h2>Playlist App</h2>
      <Notification notification={notification} />
      {userObject && (
        <GreetingLogout userObject={userObject} handleLogout={handleLogout} />
      )}


      <PlaylistList playlists={playlists} like={like} removePlaylist={removePlaylist} />

      {userObject ? (
        <PlaylistForm 
          handlePlaylist={handlePlaylist}
          playlistName={playlistName}
          setPlaylistName={setPlaylistName}
          creator={creator}
          setCreator={setCreator}
          numberOfSongs={numberOfSongs}
          setNumberOfSongs={setNumberOfSongs}
          likes={likes}
          setLikes={setLikes}
        />
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}

    </div>
  );
}

export default App;