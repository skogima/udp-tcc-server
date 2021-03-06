export interface IEquipment {
    id: string;
    datetime: string;
    battery: number;
    phaseOne: number;
    current: number;
    activePower: number;
    reactivePower: number;
    apparentPower: number;
    powerFactor: number;
}