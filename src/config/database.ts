import { createConnection } from 'typeorm';

export const databaseConnect = async () => {
    const connection = await createConnection();
    console.log(`Connection app ${connection.options.database}`);

    process.on('SIGINT', () => {
        connection.close().then(() => console.log('Closed connection'));
    });
};