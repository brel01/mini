import { createStore } from 'redux'
import { miniextReducer } from './miniextReducer'

export const store = createStore(miniextReducer);