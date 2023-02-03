 export  const modifyDate = (date) =>  {
    const monthNum = date.getMonth();
    let monthStr = "";
    switch (monthNum) {
        case 0: monthStr = "января"
            break;
        case 1: monthStr = "февраля"
            break;
        case 2: monthStr = "марта"
            break;
        case 3: monthStr = "апреля"
            break;
        case 4: monthStr = "мая"
            break;
        case 5: monthStr = "июня"
            break;
        case 6: monthStr = "июля"
            break;
        case 7: monthStr = "августа"
            break;
        case 8: monthStr = "сентября"
            break;
        case 9: monthStr = "октября"
            break;
        case 10: monthStr = "ноября"
            break;
        case 11: monthStr = "декабря"
            break;
    
        default:console.log("Wrong input date")
            break;
    }
     const minutes = date.getMinutes().toString();
     console.log(minutes.length)
     const minutesStr = minutes.length === 1 ? `0${minutes}`:`${ minutes }`;
    return `${date.getDate()} ${monthStr}, ${date.getFullYear()} | ${date.getHours()}:${minutesStr}`
}