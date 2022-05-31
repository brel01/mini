import { combineReducers } from 'redux';
import { Action } from "./actions";
import { Login } from "./actions";

export interface ArrClasses {
    Name: string; Students: string 
}

export interface ArrLogin {
    Name: string; LoggedIn: boolean
}

type NewType = ArrClasses;

type NewLoginType = ArrLogin;

export interface MiniextState {
    classes: NewType[],
    status: NewLoginType[]
}

const initialState = {
    classes: [],
    status: [{ Name: "", LoggedIn: false }],
}

export const miniextReducer = (state: MiniextState = initialState, action: Action | Login) => {
    switch (action.type) {
        case "ADD_CLASSES": 
            return { ...state, classes: [action.payload]}
         break;
        case "LOG_IN":
            return { ...state, status: [action.payload] }
        
        default:
            return state;
    }
}

