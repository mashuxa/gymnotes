export const API_URL = 'http://127.0.0.1:3000';

export const TYPES = {
  STRENGTH: {
    name: 'Силовые',
    params: {
      SETS: {
        name: "Подходы",
        unit: "раз"
      },
      COUNT: {
        name: "Количество",
        unit: "раз"
      },
      WEIGHTH: {
        name: "Вес",
        unit: "кг"
      }
    }
  },
  CARDIO: {
    name: 'Кардио',
    params: {
      DISTANCE: {
        name: "Дистанция",
        unit: "км"
      },
      DURATION: {
        name: "Длительность",
        unit: "мин"
      },
      SPEED: {
        name: "Скорость",
        unit: "км/ч"
      },
      CALORIES: {
        name: "Каллории",
        unit: ""
      }
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
  exercises: "exercises",
  currentTraining: "currentTraining"
};
