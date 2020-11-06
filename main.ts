import dgram from 'dgram';
import { convertBufferToObject } from './utils/parser'; 
import { IReading } from './entities/reading';
import { Equipment } from './model/equipment';
import moment from 'moment';

const server = dgram.createSocket('udp4');

const HOST = '0.0.0.0';
const PORT = 60000;

server.on('listening', () => {
    const addr = server.address();
    console.log(`Server is running on ${addr.address}:${addr.port}`);
});

server.on('message', (data, remote) => {
    const object = convertBufferToObject(data);

    if (!object) {
        return;
    }

    const reading = object as IReading;
    
    if (!reading || !reading.id || !reading.dt) {
        return;
    }

    Equipment.createFromReading(reading).then((resp) => {
        if (resp) {
            console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} => OK (created)`);
        }
        else {
            console.log(`${moment().format('DD/MM/YYYY HH:mm:ss')} => ERROR PARSING DATA`);
        }
    });
});

server.on('error', (err) => {
    console.log(err);
});

server.on('close', () => {
    console.log('Server closed');
});

server.bind(PORT, HOST);