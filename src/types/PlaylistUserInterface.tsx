export interface Playlist {
  Playlist: any[];
  SelectedPlaylistID: string | null,
  SelectedPlaylist: any | null,
  status: "idle" | "loading" | "failed";
  error: string | null;
}

