import {
  CREATE_USER_LIST,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
} from "./../types/user";

const initialState = {
  loading: false,
  users: [] as string[],
  appointment: [] as string[],
};

export function user(state = initialState, action: any) {
  switch (action.type) {
    case CREATE_USER_LIST:
      return {
        ...state,
        users: action.payload.slice().sort(function (a: any, b: any) {
          return (
            new Date(a.startDate).valueOf() - new Date(b.startDate).valueOf()
          );
        }),
      };

    case ADD_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload,
      };

    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointment: state.appointment.filter(
          (res: any) => res.id !== action.payload
        ),
      };

    default:
      return state;
  }
}
