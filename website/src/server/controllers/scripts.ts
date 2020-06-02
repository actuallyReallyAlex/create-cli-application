import express, { Router, Request, Response } from 'express';
import path from 'path';

class ScriptsController {
  public router: Router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes(): void {
    this.router.get(
      '/scripts/react.js',
      async (req: Request, res: Response) => {
        let filePath = '../../node_modules/react/umd/react.development.js';
        if (process.env.NODE_ENV === 'production') {
          filePath = '../../node_modules/react/umd/react.production.min.js';
        }
        res.sendFile(path.join(__dirname, filePath));
      },
    );

    this.router.get(
      '/scripts/react-dom.js',
      async (req: Request, res: Response) => {
        let filePath =
          '../../node_modules/react-dom/umd/react-dom.development.js';
        if (process.env.NODE_ENV === 'production') {
          filePath =
            '../../node_modules/react-dom/umd/react-dom.production.min.js';
        }
        res.sendFile(path.join(__dirname, filePath));
      },
    );
  }
}

export default ScriptsController;
