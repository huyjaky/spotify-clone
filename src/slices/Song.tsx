import useSpotify from "@/hooks/useSpotify";
import { SongContextState, song } from "@/types/Song";
import { useSession } from "next-auth/react";
import { ReactNode, createContext, useEffect, useState } from "react";

interface songContextProps {
  children: ReactNode
}

const defaultSongContextState: SongContextState = {
  songContext: {
    selectedSongID: undefined,
    selectedSong: null,
    isPlaying: false,
    volume: 50,
    deviceID: null
  },
  setSongContext: () => { }
}



export const SongContext = createContext<SongContextState>(defaultSongContextState);

const SongContextProvider = ({ children }: songContextProps) => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [songContext, setSongContext_] = useState(defaultSongContextState.songContext);
  const setSongContext = (payload: song) => setSongContext_(prevState => ({
    ...prevState,
    ...payload
  }));

  const songContextDynamicData = { songContext, setSongContext };

  useEffect(() => {
    const setCurrentDevice = async () => {
      const availableDeviceRes = await spotifyApi.getMyDevices();
      console.log('availabile devices', availableDeviceRes);
      if (!availableDeviceRes.body.devices.length) return
      const { id: deviceID, volume_percent } = availableDeviceRes.body.devices[0];
      setSongContext({ ...songContext, deviceID: deviceID, volume: volume_percent as number })
      await spotifyApi.transferMyPlayback([deviceID as string]);
    }

    if (spotifyApi.getAccessToken()) {
      setCurrentDevice();
    }
  }, [spotifyApi, session])

  useEffect(() => {
    const getCurrentPlayingSong = async () => {
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
      getCurrentPlayingSong();
    }
  }, [spotifyApi, session, songContext])

  return (
    <SongContext.Provider value={songContextDynamicData}>
      {children}
    </SongContext.Provider>
  )
}

export default SongContextProvider;


