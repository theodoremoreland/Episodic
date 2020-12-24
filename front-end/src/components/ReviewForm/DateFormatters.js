export const toPartialISOString = (date) => {
    const yyyymmdd = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString()
        .split("T")[0]

    return yyyymmdd;
};