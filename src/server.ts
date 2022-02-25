import { app } from './app';

const PORT = 3000;

const server = app.listen(PORT, () => console.log(`APP listening port: ${PORT}`));

/**
 * Close the app at the end of the process
 */
process.on('SIGINT', () => {
    server.close();
    console.log(`Closed app`);
});