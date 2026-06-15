import {app} from "./app.js"
import dotenv from 'dotenv'
import { PORT } from './config/env.js';

dotenv.config()

// const port = process.env.PORT

async function startServer() {
    app.listen(PORT, async () => {
        console.log(`server is  running on port ${PORT}`);
    });
}

startServer();