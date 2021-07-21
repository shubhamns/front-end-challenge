import {
  CREATE_USER_LIST,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "./../types/user";

export function createUser(data: any) {
  return (dispatch: any) => {
    dispatch({ type: CREATE_USER_LIST, payload: data });
  };
}

export function addAppointment(data: any) {
  console.log(data);
  return (dispatch: any) => {
    dispatch({ type: ADD_APPOINTMENT, payload: data });
  };
}

export function deleteAppointment(id: number) {
  return (dispatch: any) => {
    dispatch({ type: DELETE_APPOINTMENT, payload: id });
  };
}
