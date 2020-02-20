import actionTypes from "../actionTypes";
import IndexedDB from "../api/indexedDB";
import {INDEXED_DB_TABLES} from "../constants";

const setExercises = (params) => {
    return {
        type: actionTypes.GET_EXERCISES,
        payload: params
    }
};

export const fetchExercises = () => async (dispatch) =>
  dispatch(setExercises(await IndexedDB.getData(INDEXED_DB_TABLES.exercises)));

export const deleteExercise = (id) => async (dispatch) => {
  await IndexedDB.deleteData(INDEXED_DB_TABLES.exercises, id);
  dispatch(fetchExercises());
};

export const putExercise = ({type, name, id}) => async (dispatch) => {
    if (id) {
        await IndexedDB.putData(INDEXED_DB_TABLES.exercises, {type, name, id});
    } else {
        await IndexedDB.putData(INDEXED_DB_TABLES.exercises, {type, name});
    }
    dispatch(fetchExercises());
};

