const PlaylistForm = ({ 
    handlePlaylist,
    playlistName,
    setPlaylistName,
    creator,
    setCreator,
    numberOfSongs,
    setNumberOfSongs,
    likes,
    setLikes
 }) => {
    return (
      <form onSubmit={handlePlaylist}>
    <div>
        <label>Playlist Name</label>
        <input
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
        />
    </div>
    <div>
        <label>Creator</label>
        <input
            type="text"
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
        />
    </div>
    <div>
        <label>Number of Songs</label>
        <input
            type="number"
            value={numberOfSongs}
            onChange={(e) => setNumberOfSongs(e.target.value)}
        />
    </div>
    <div>
        <label>Likes</label>
        <input
            type="number"
            value={likes}
            onChange={(e) => setLikes(e.target.value)}
        />
    </div>
        <button type="submit">Add to the list</button>
      </form>
    );
  };
  
  export default PlaylistForm;