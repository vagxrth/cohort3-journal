
interface TwitterWidgets {
  load: () => void;
  createTweet: (
    tweetId: string,
    element: HTMLElement,
    options?: object
  ) => Promise<void>;
}

interface Twitter {
  widgets: TwitterWidgets;
}

declare global {
  interface Window {
    twttr: Twitter;
  }
}