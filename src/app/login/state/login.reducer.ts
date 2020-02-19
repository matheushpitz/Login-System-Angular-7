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
        case ActionTypes.InvalidLogin:
            return {
                ...state,
                logging: false
            };
        case ActionTypes.SuccessfullyLogged:
            return {
                ...state,
                logging: false,
                token: action.payload.token
            };
        case ActionTypes.Logout:
            return {
                ...state,
                token: undefined
            };
        case ActionTypes.Refresh:
            return state;
        default:
            return state;
    }
}