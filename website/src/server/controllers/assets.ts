import express, { Router, Request, Response } from 'express';
import path from 'path';

class AssetsController {
  public router: Router = express.Router();

  static assetList: string[] = [
    'gdemo.min.css',
    'milligram.css',
    'milligram.min.css.map',
    'normalize.css',
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
