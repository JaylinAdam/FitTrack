const Tools = {
    formatDate: (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    hasValue: (value: string | undefined): boolean => !!value?.trim(),

    isOnlyNumbers: (str: string): boolean => str === "" || /^\d+$/.test(str),

    isOnlyLettersWithSpaces: (str: string): boolean =>
        /^[a-zA-Z\s]+$/.test(str),
};

export { Tools };
