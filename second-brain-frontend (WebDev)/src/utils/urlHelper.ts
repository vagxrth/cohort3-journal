export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function getTweetId(url: string): string | null {
  const regExp = /\/status\/(\d+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}