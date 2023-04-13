export interface Playlist {
  Playlist: any[];
  status: "idle" | "loading" | "failed";
  error: string | undefined;
}

