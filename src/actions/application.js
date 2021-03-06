import actionTypes from "../actionTypes";
import IndexedDB from "../api/indexedDB";
import {INDEXED_DB_TABLES} from "../constants";

const setExercises = (params) => {
    return {
        type: actionTypes.GET_EXERCISES,
        payload: params
    }
};

export const setExercisesToTraining = (params) => {
    return {
        type: actionTypes.SET_EXERCISES_TO_TRAINING,
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

export const fetchCurrentTraining = () => async (dispatch) =>
  dispatch(setExercisesToTraining(await IndexedDB.getData(INDEXED_DB_TABLES.currentTraining)));

export const deleteCurrentTrainingExercise = (id) => async (dispatch) => {
    await IndexedDB.deleteData(INDEXED_DB_TABLES.currentTraining, id);
    dispatch(fetchCurrentTraining());
};

export const putCurrentTraining = (data) => async (dispatch) => {
    await IndexedDB.putData(INDEXED_DB_TABLES.currentTraining, data);
    dispatch(fetchCurrentTraining());
};
