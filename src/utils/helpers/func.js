export function extractDate(date){
    let dateObj = new Date(date);
    return dateObj.getDate() + "-" + (dateObj.getMonth() + 1) + "-" + dateObj.getFullYear();
}