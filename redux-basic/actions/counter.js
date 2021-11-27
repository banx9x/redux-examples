import { COUNT_UP, COUNT_DOWN } from "./actions";

export const countUp = (payload) => ({ type: COUNT_UP, payload });
export const countDown = (payload) => ({ type: COUNT_DOWN, payload });
