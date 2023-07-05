import { spotifyApi } from "@/config/Spotify";
import useSpotify from "@/hooks/useSpotify";
import { SongContext } from "@/slices/Song";
import { useContext, useEffect } from "react";



const PlayPause = () => {
  const { songContext, setSongContext } = useContext(SongContext);
  const handlePlayPause = async () => {
    const response = await spotifyApi.getMyCurrentPlaybackState();
    if (!response.body) return;

    if (songContext.isPlaying) {
      await spotifyApi.pause();
    } else {
      await spotifyApi.play();
    }
    setSongContext({ ...songContext, isPlaying: !songContext.isPlaying });
  };

  useEffect(() => {}, [songContext.isPlaying])

  return (
    <>
      {/* play/pause button */}
      <div className="w-fit h-full">
        {/* play */}
        <button
          id="play--btn"
          onClick={handlePlayPause}
          className={` hover:transition-transform hover:scale-[1.25]
            hover:duration-300 ${songContext.isPlaying ? '' : 'hidden'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-white"
          >
            <path
              fillRule="evenodd"
              d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* pause */}
        <button
          id="pause--btn"
          onClick={handlePlayPause}
          className={` hover:transition-transform hover:scale-[1.25]
            hover:duration-300 ${songContext.isPlaying ? 'hidden' : ''}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-10 h-10 text-white"
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default PlayPause;
