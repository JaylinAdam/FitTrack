const Tools = {
    formatDate: (date: Date): string => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    hasValue: (value: string | undefined): boolean => {
        return !!value?.trim();
    },

    isOnlyNumbers: (str: string): boolean => {
        return str === '' || /^\d+$/.test(str);
    },

    isOnlyLettersWithSpaces: (str: string): boolean => {
        return /^[a-zA-Z\s]+$/.test(str);
    },

    // METHOD: generate display for exercise
    generateWorkoutDisplay: (sets: string, reps: string, info: string) => {
        const x = sets || reps ? 'x' : '';
        const showInfo = info ? `•${info}` : '';
        return sets + x + reps + showInfo;
    },
};

export { Tools };
