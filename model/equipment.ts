import firebase from '../services/firebase';
import { IEquipment } from '../entities/equipment';
import moment from 'moment';
import { calculateReactivePower } from '../utils/mathHelper';
import { IReading } from '../entities/reading';

const database = firebase.database();

export class Equipment {
    static async createFromReading(reading: IReading) {
        const formatDate = moment(reading.dt, 'YY-MM-DD-HH-mm-ss');
        const reactivePower = calculateReactivePower(reading.pa, reading.pr);

        const equipment : IEquipment = {
            activePower: reading.pr < 0 ? -reading.pr : reading.pr,
            apparentPower: reading.pa < 0 ? -reading.pa : reading.pa,
            current: reading.c < 0 ? -reading.c : reading.c,
            reactivePower,
            phaseOne: reading.f1,
            battery: 1.0,
            datetime: formatDate.format('YYYY-MM-DD HH:mm:ss'),
            id: reading.id,
            powerFactor: reading.fp < 0 ? -reading.fp : reading.fp
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