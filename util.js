export function currentTime () {
    const now = new Date();
    const timeString = `${now.getHours()} : ${now.getMinutes()}`;
    
    return timeString;
}