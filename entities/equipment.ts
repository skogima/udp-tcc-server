export interface IEquipment {
    id: string;
    datetime: string;
    phaseOne: number;
    phaseTwo: number;
    phaseThree: number;
    current: number;
    activePower: number;
    reactivePower: number;
    apparentPower: number;
    powerFactor: number;
}