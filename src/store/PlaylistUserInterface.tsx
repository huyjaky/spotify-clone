export interface Playlist {
  user: any;
  Playlist: any[];
  status: "idle" | "loading" | "failed";
  error: string | undefined;
}

