export const determineCurrentSaturday = () => {
    const currentSaturday = new Date();

    // If today is Sunday, currentSaturday is yesterday.
    if (currentSaturday.getDay() === 0) {
        currentSaturday.setDate(currentSaturday.getDate() - 1);
    } 
    else {
        // If today is not Saturday nor Sunday, increment one day.
        while (currentSaturday.getDay() !== 6) {
            currentSaturday.setDate(currentSaturday.getDate() + 1);
        }
    }
    return currentSaturday;
};


export const isNotCurrentOrPreviousSaturday = (date) => date.getDay() !== 6 || date > determineCurrentSaturday();