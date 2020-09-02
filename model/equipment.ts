import firebase from '../services/firebase';
import { IEquipment } from '../entities/equipment';
import moment from 'moment';
import { IReading } from '../entities/reading';

const database = firebase.database();

export class Equipment {
    static async createFromReading(reading: IReading) {
        const formatDate = moment(reading.dt, 'YY-MM-DD-HH-mm-ss');
        
        const equipment : IEquipment = {
            activePower: reading.ap,
            apparentPower: reading.app,
            reactivePower: reading.rp,
            current: reading.c,
            phaseOne: reading.f1,
            phaseTwo: reading.f2,
            phaseThree: reading.f3,
            datetime: formatDate.format('YYYY-MM-DD HH:mm:ss'),
            id: reading.id,
            powerFactor: reading.pf
        };
        
        const date = moment(equipment.datetime, 'YY-MM-DD-HH-mm-ss')
        const unixDate = date.format('x')

        try {
            await database
            .ref(`leituras/${equipment.id}/${unixDate}`)
            .update(equipment);
            return true;
        }
        catch {
            return false;
        }
    }
}