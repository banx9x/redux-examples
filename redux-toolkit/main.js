import {
    increment,
    incrementBy,
    decrement,
    decrementBy,
    unusedAction,
} from "./slices/counter.slice";
import * as cart from "./slices/cart.slice";
import { getTasks, createTask } from "./slices/todo.slice";
import store from "./store";
import { unwrapResult } from "@reduxjs/toolkit";

// Tự động thêm default case
store.dispatch(unusedAction());

store.dispatch(increment());
store.dispatch(increment());

store.dispatch(incrementBy(1));
store.dispatch(incrementBy(2));

store.dispatch(decrement());
store.dispatch(decrement());

store.dispatch(decrementBy(1));
store.dispatch(decrementBy(2));

store.dispatch(cart.addItem(1));
store.dispatch(cart.addItem(2));

store.dispatch(cart.addItem(1)); // Đã có, qty = 2

store.dispatch(cart.increment(1)); // qty = 3

store.dispatch(cart.decrement(1)); // qty = 2
store.dispatch(cart.decrement(1)); // qty = 1
store.dispatch(cart.decrement(1)); // qty vẫn bằng 1

store.dispatch(cart.removeItem(2));

store.dispatch(cart.incrementByAmount({ pid: 1, amount: 2 })); // qty = 3
store.dispatch(cart.addItem(2));
store.dispatch(cart.addItem(6));

const items = cart.selectItems(store.getState());
const totalItems = cart.selectTotalItems(store.getState());
const subTotal = cart.selectSubTotal(store.getState());
const tax = cart.selectTax(store.getState());
const total = cart.selectTotal(store.getState());

console.log("\n");
console.log("Products in Cart:", items);
console.log("Total items:", totalItems);
console.log("Sub total:", subTotal);
console.log("Tax:", tax);
console.log("Total:", total);

// Async
// Mặc định dispatch async thunk trả về một promise, kết quả nhận được là action, với type, payload
// Có thể gọi abort() thông qua promise để cancel request
let promise = store.dispatch(getTasks());
promise.abort("Thích thì abort() thôi :)");

promise = store.dispatch(getTasks());
promise.then((action) => {
    console.log("Success:", action);
});

// Thunk cung cấp API unwrap() hoặc unwrapResult() cho phép lấy về kết quả gốc của promise (bên trong createAsyncThunk, cụ thể là câu lệnh fulfillWithValue(res.data))
store
    .dispatch(createTask({ userId: 10, title: "Hello" }))
    .unwrap()
    .then((data) => console.log(data))
    .catch((data) => console.log(data));

// Tương tự với unwrapResult
store
    .dispatch(createTask({ userId: 10, title: "Hello" }))
    .then(unwrapResult)
    .then((data) => console.log(data))
    .catch((data) => console.log(data));

// Amazing
console.log("\n");
store.hello();
store.goodbye();
