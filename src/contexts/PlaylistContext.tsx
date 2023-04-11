import {ReactNode, createContext, useContext} from 'react';

const defaultPlaylistContextState: PlaylistContextState = {
  playlist: []
}

export const PlaylistContext = createContext<IPplaylistContext> ({
    PlaylistContextState: defaultPlaylistContextState
})

export const usePlaylistContext =  () => useContext(PlaylistContext)

const PlaylistContextProvider = ({children}: {children: ReactNode}) => {
  const PlaylistContextProviderData = {
    PlaylistContextState: {
      playlist: [1,2]
    }
  }
  return <PlaylistContext.Provider value={PlaylistContextProviderData}>
    {children}
  </PlaylistContext.Provider>
}

export default PlaylistContextProvider;