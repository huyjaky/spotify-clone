
export interface Device {
  Device: any,
  status: "idle" | "loading" | "failed";
  error: string | undefined;
}