export function currentTime () {
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes()}`;
    // ${now.getMinutes() >= 12 ? 'PM' : 'AM'}
    
    return timeString;
}