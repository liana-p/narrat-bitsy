export {};

declare global {
  interface Window {
    defaultFontName: string;
    attachCanvas: (canvas: HTMLCanvasElement) => void;
    loadGame: (gameData: any, defaultFontData: any) => void;
  }
}
