export function convertBufferToObject(buffer: Buffer): Object | boolean {
    if (!buffer)
        return false;
    try {
        const data = eval(`(${buffer})`);
        return data;
    }
    catch (e) {
        return false;
    }
}