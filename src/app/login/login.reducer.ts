import { LoginActions, ActionTypes } from './login.actions';

const initialState = {
    logging: false
}

export const LoginReducer = (state = initialState, action: LoginActions) => {
    switch(action.type) {
        case ActionTypes.Login:
            return {
                ...state,
                logging: true
            };
        case ActionTypes.LoginError:
            return {
                ...state,
                logging: false
            };
        case ActionTypes.SuccessfullyLogged:
            return {
                ...state,
                logging: false
            };
        case ActionTypes.Logout:
            return state;
        default:
            return state;
    }
}