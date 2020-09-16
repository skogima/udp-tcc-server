import firebase from '../services/firebase';
import { IEquipment } from '../entities/equipment';
import moment from 'moment';
import { calculateReactivePower } from '../utils/mathHelper';
import { IReading } from '../entities/reading';

const database = firebase.database();

export class Equipment {
    static async createFromReading(reading: IReading) {
        const formatDate = moment(reading.dt, 'YY-MM-DD-HH-mm-ss');
        const reactivePower = calculateReactivePower(reading.pap, reading.fp);

        const equipment : IEquipment = {
            activePower: reading.pa,
            apparentPower: reading.pap,
            current: reading.c,
            reactivePower,
            phaseOne: reading.f1,
            phaseTwo: reading.f2,
            phaseThree: reading.f3,
            datetime: formatDate.format('YYYY-MM-DD HH:mm:ss'),
            id: reading.id,
            powerFactor: reading.fp
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