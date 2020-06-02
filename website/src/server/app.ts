import chalk from 'chalk';
import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import path from 'path';

import { Controller } from './types';

class App {
  public app: express.Application;

  public port: number | string;

  constructor(controllers: Controller[], port: number | string) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    const whitelistDomains = [
      'http://localhost:3000',
      'http://localhost:8080',
      'http://192.168.1.228:3001', // * Browsersync
      undefined,
    ];

    const corsOptions = {
      origin: (origin: string, cb: Function): void => {
        if (whitelistDomains.indexOf(origin) !== -1) {
          cb(null, true);
        } else {
          // eslint-disable-next-line no-console
          console.error(`Sever refused to allow: ${origin}`);
          cb(new Error('Not allowed by CORS'));
        }
      },
    };

    this.app.use(cors(corsOptions));
  }

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });

    this.app.use(express.static(path.join(__dirname, '../dist')));

    this.app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Mode: ${chalk.yellowBright(process.env.NODE_ENV)}\n`);
      // eslint-disable-next-line no-console
      console.log(
        `Server is listening on port: ${chalk.yellowBright(this.port)}\n`,
      );
    });
  }
}

export default App;
