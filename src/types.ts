export interface Apology {
  id: string;
  title: string;
  url: string;
  points: number;
  author: string;
  createdAt: string;
  numComments: number;
}

declare global {
  interface Window {
    __INITIAL_DATA__?: Apology[];
  }
}
