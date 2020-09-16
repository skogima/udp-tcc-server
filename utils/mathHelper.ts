export function calculateReactivePower(apparentPower: number, activePower: number) {
    if (apparentPower && activePower) {
        return Math.sqrt(Math.pow(apparentPower, 2) - Math.pow(activePower, 2));
    }
    
    return 0;
}