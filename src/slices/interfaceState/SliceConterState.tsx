
export interface CounterState {
  value: number,
  post: Post[],
  status: 'idle' | 'loading' | 'failed',
  error: string | undefined,
}

export interface Post {
  userId: number,
  id: number,
  title: string,
  body: string
}


