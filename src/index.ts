import { getConfig } from 'narrat';
import { aspectRatioFit } from '@/display';
import {
  CommandPlugin,
  generateParser,
  NarratActionContext,
  NarratPlugin,
} from '@/plugins';

declare global {
  interface Window {
    defaultFontName: string;
    attachCanvas: (canvas: HTMLCanvasElement) => void;
    loadGame: (gameData: any, defaultFontData: any) => void;
  }
}

export function attachBitsyGameToNarrat() {
  console.log('BITSY PLUGIN', 'Attaching bitsy');
  const appContainer = document.querySelector('.background');
  const gameCanvas = document.createElement('canvas');
  gameCanvas.id = 'game';
  const layout = getConfig().layout.backgrounds;
  const bitsyLayout = {
    width: 512,
    height: 512,
  };
  const canvasSize = aspectRatioFit(
    layout.width,
    layout.height,
    bitsyLayout.width,
    bitsyLayout.height,
  );
  const finalSize = {
    width: bitsyLayout.width * canvasSize,
    height: bitsyLayout.height * canvasSize,
  };
  gameCanvas.style.left = `${(layout.width - finalSize.width) / 2}px`;
  gameCanvas.style.top = `${(layout.height - finalSize.height) / 2}px`;
  gameCanvas.style.width = `${finalSize.width}px`;
  gameCanvas.style.height = `${finalSize.height}px`;
  gameCanvas.classList.add('narrat-canvas');
  gameCanvas.classList.add('bitsy-canvas');
  gameCanvas.style.zIndex = '2';
  appContainer.appendChild(gameCanvas);

  (window as any).startExportedGame();
  console.log('BITSY PLUGIN', 'Bitsy loaded');
  return gameCanvas;
}

const fakeInput = {
  isKeyDown: () => false,
  anyKeyDown: () => false,
  isTapReleased: () => false,
  isRestartComboPressed: () => false,
  swipeUp: () => false,
  swipeLeft: () => false,
  swipeRight: () => false,
  swipeDown: () => false,
  resetTapReleased: () => false,
};

export interface BitsyPluginOptions {
  showOnGameStart?: boolean;
}
export class BitsyPlugin extends NarratPlugin {
  canvas: HTMLCanvasElement;
  customCommands: CommandPlugin[];
  options: BitsyPluginOptions;
  oldInputs: any;
  onGameMounted() {
    this.canvas = attachBitsyGameToNarrat();
    if (!this.options.showOnGameStart) {
      this.hideBitsy();
    }
  }
  constructor(options: BitsyPluginOptions = {}) {
    super();
    this.options = options;
    this.customCommands = [
      new CommandPlugin(
        'show_bitsy',
        (ctx, cmd) => this.showBitsyCommand(ctx),
        generateParser('show_bitsy'),
      ),
      new CommandPlugin(
        'hide_bitsy',
        (ctx, cmd) => this.hideBitsyCommand(ctx),
        generateParser('hide_bitsy'),
      ),
    ];
  }

  async showBitsyCommand({ dispatch, commit }: NarratActionContext) {
    this.canvas.style.display = 'block';
    if (this.oldInputs) {
      const w = window as any;
      w.input = this.oldInputs;
      delete this.oldInputs;
    }
    commit('pause');
    // return dispatch('nextLine');
  }

  async hideBitsyCommand({ dispatch, commit }: NarratActionContext) {
    this.hideBitsy();
    commit('unpause');
    return dispatch('nextLine');
  }

  hideBitsy() {
    this.canvas.style.display = 'none';
    const w = window as any;
    this.oldInputs = w.input;
    w.input = fakeInput;
  }
}
