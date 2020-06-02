import express, { Router, Request, Response } from 'express';
import path from 'path';

class AssetsController {
  public router: Router = express.Router();

  static assetList: string[] = [
    'android-chrome-192x192.png',
    'android-chrome-512x512.png',
    'apple-touch-icon.png',
    'background.png',
    'browserconfig.xml',
    'favicon-16x16.png',
    'favicon-32x32.png',
    'favicon.ico',
    'gdemo.min.css',
    'milligram.css',
    'milligram.min.css.map',
    'mstile-150x150.png',
    'normalize.css',
    'safar-pinned-tab.svg',
    'site.webmanifest',
  ];

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    AssetsController.assetList.forEach((asset: string) => {
      this.router.get(
        `/assets/${asset}`,
        async (req: Request, res: Response) => {
          res.sendFile(path.join(__dirname, `../assets/${asset}`));
        },
      );
    });
  }
}

export default AssetsController;
