import useSpotify from "@/hooks/useSpotify";
import { fetchDevice, getDevice } from "@/slices/Device";
import { SongContext } from "@/slices/Song";
import { AppDispatch } from "@/store/store";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackButton from "./controlButton/BackButton";
import NextButton from "./controlButton/NextButton";
import PlayPause from "./controlButton/PlayPause";
import ReplyButton from "./controlButton/ReplyButton";
import SwitchButton from "./controlButton/SwitchButton";
import Volumn from "./volumn/Volum";



const Play = () => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const Device = useSelector(getDevice);
  const { songContext, setSongContext } = useContext(SongContext)
  const spotifyApi = useSpotify();
  const [isNext, setIsNext] = useState<boolean>(false);

  const handleSkipSong = async (skipTo: 'previouse' | 'next') => {
    setIsNext(!isNext);
    if (!songContext.deviceID) return;
    if (skipTo === 'previouse') {
      await spotifyApi.skipToPrevious();
    } else {
      await spotifyApi.skipToNext();
    }

  }

  useEffect(() => {
    const fetchApi = async () => {
      const songInfo = await spotifyApi.getMyCurrentPlayingTrack();
      if (!songInfo.body) return;
      console.log('song info', songInfo);

      setSongContext({
        ...songContext, selectedSongID: songInfo.body.item?.id,
        selectedSong: songInfo.body.item as SpotifyApi.TrackObjectFull,
        isPlaying: songInfo.body.is_playing
      })
    }
    if (spotifyApi.getAccessToken()) {
      fetchApi();
    }
  }, [isNext])

  const fetchDevice_ = () => {
    if (session && Device.length == 0) {
      return dispatch(fetchDevice());
    }
  };

  useEffect(() => {
    fetchDevice_();
  }, [session]);

  // useEffect(() => { console.log('song', songContext.selectedSong); }, [songContext, setSongContext])

  return (

    <div className="bg-slate-800 h-full w-full box-border px-3 pb-3">
      <div className="bg-slate-700 w-full h-full rounded-xl">
        {/* Protect div */}
        <div className="w-full h-full flex overflow-hidden">
          {/* Music is playing */}
          <div className="flex-1 w-full h-full">
            {songContext.selectedSong &&
              <>
                <div className="h-full w-fit ml-10 flex">
                  <img src={songContext.selectedSong.album.images[0].url + ''} alt="" className="h-[70px] m-auto" />
                  <div className="flex flex-col justify-center ml-2">
                    <span className="text-white font-semibold">{songContext.selectedSong.name}</span>
                    <span className="text-white">{songContext.selectedSong.artists[0].name + ''}</span>
                  </div>
                </div>

              </>
            }
          </div>

          {/* control process */}
          <div className="flex-1 w-full h-full ">
            <div className="h-[50%] flex justify-center space-x-16">
              {/* switch song */}
              <SwitchButton />

              {/* back button */}
              <BackButton handleSkipSong={handleSkipSong} />

              {/* play/pause button */}
              <PlayPause />

              {/* next button */}
              <NextButton handleSkipSong={handleSkipSong} />

              {/* reply button */}
              <ReplyButton />
            </div>

            <div className="w-full h-[50%] flex-1">
              <div className="w-full h-full">check</div>
            </div>
          </div>

          {/* volumn */}
          <Volumn />
        </div>
      </div>
    </div>
  );
};

export default Play;
