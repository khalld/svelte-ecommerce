function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth()),
        date.getFullYear(),
    ].join('-');
}

export default function convertData(dt){
    const year = dt.substring(0,4)
    const month = dt.substring(5,7)
    const day = dt.substring(8,10)
    return formatDate(new Date(year, month, day))
}