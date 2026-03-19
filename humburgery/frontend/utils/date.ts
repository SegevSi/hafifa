const proccesDate = (date: string | Date): string => {
    const DATE_FORMAT = "en-Us";

    if (date instanceof Date)
        return date.toLocaleDateString(DATE_FORMAT);

    return new Date(date).toLocaleDateString(DATE_FORMAT);
};


export { proccesDate };