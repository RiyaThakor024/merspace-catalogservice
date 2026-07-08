import express,{ NextFunction, Request, Response} from 'express';
import createHttpError, { HttpError } from 'http-errors';
import { logger } from './config/logger';

const app = express();
app.use(express.json());
app.use(express.static('public'));

app.get('/',(req,res)=>{
  const error = createHttpError(401,'you cannot access this route');
  throw error;
  res.send('Welcome to Catalog Service...!!')
});

// global error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message);
    const e = err as unknown as { status?: number; statusCode?: number };
    const statusCode =
        typeof e.status === 'number'
            ? e.status
            : typeof e.statusCode === 'number'
              ? e.statusCode
              : 500;

    res.status(statusCode).json({
        errors: [
            {
                type: err.name,
                msg: err.message,
                path: '',
                location: '',
            },
        ],
    });
});

export default app;