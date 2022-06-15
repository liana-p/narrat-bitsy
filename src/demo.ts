import { registerPlugin, startApp } from 'narrat';
import { BitsyPlugin } from './index';

window.addEventListener('load', () => {
  registerPlugin(new BitsyPlugin());
  startApp(
    {
      charactersPath: 'data/characters.json',
      configPath: 'data/config.json',
    },
    {
      logging: false,
      debug: true,
    },
  );
});
