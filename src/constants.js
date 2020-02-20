export const API_URL = 'http://127.0.0.1:3000';

export const TYPES = {
    STRENGTH: {
        name: 'Силовые',
        params: {
            SETS: '',
            COUNT: '',
            WEIGHTH: ''
        }
    },
    CARDIO: {
        name: 'Кардио',
        params: {
            DISTANCE: '',
            DURATION: '',
            SPEED: '',
            CALORIES: ''
        }
    }
};

export const ERRORS = {
    err_001: 'IndexedDB can not be open'
};
export const WARNINGS = {
    wrn_001: 'IndexedDB should be updated'
};

export const INDEXED_DB_NAME = "gymnotesDB";
export const INDEXED_DB_TABLES = {
    exercises: "exercises"
};
