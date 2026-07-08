import { config } from "./config";
import app from "./app";
import { AppDataSource } from "./config/data-source";
import {logger} from './config/logger';

const startServer = async()=>{
        const PORT = config.PORT;
        try {
            await AppDataSource.initialize();
            logger.info('DataBase connected successfully');
            app.listen(PORT,()=>{
                logger.info(`Listening on port ${PORT}`);
            });
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
};

void startServer();