import { useState } from "react";

const Playlist = ({ like, removePlaylist, playlist }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div>
            <h3>{playlist.name} by {playlist.creator}</h3>
            {isOpen && <>
                {playlist.name} by {playlist.creator} <br />
                {playlist.numOfSongs} Songs <br />
                {playlist.likes} Likes <button onClick={() => like(playlist.id)}>Like</button>
                <hr />
                Created by {playlist.creator} <button onClick={() => removePlaylist(playlist.id)}>Remove</button>
            </>}
            <div>
                <button onClick={() => setIsOpen(!isOpen)}>{isOpen ? "Hide" : "Show"}</button>
            </div>
        </div>
    );
};

export default Playlist;