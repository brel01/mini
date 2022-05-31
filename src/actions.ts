import { AnyAction } from "redux";
import { ArrClasses, ArrLogin} from "./miniextReducer";

export type Action = {
    type: "ADD_CLASSES",
    payload: any
}

export type Login = {
    type: "LOG_IN",
    payload: any
}

export const addClasses = (classes: any) => ({
    type: "ADD_CLASSES", payload: classes
});

export const updateLoginStatus = (status: any) => ({
    type: "LOG_IN", payload: status
})

