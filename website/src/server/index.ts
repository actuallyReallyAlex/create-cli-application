import App from './app';
import AssetsController from './controllers/assets';
import ScriptsController from './controllers/scripts';

const app = new App(
  [new AssetsController(), new ScriptsController()],
  process.env.PORT,
);

app.listen();
