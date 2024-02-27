import { store } from "../store/configureStore";

export const selectStore = (name) => store.getState()[name];
