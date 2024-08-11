export const countMonth = (currentMonth: Date, emiMonth:Date) => {
    let countDueYearMonth = (currentMonth.getFullYear() - emiMonth.getFullYear()) * 12
    let countDueMonth = currentMonth.getMonth() - emiMonth.getMonth() + countDueYearMonth
    
    if(currentMonth.getDate() < emiMonth.getDate()) {
        countDueMonth -= 1
    }

    return countDueMonth
}