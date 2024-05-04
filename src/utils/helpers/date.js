export function convertDate(date) {
    const newDate = new Date(date);
    return newDate.toDateString() + ", " + newDate.toLocaleTimeString() + "." ;
}