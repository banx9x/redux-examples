import {
    increment,
    incrementBy,
    decrement,
    decrementBy,
    unusedAction,
} from "./slices/counter.slice";
import {
    clear,
    addItem,
    removeItem,
    selectTotal,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
} from "./slices/cart.slice";
import { getTasks, createTask } from "./slices/todo.slice";
import store from "./store";
import { unwrapResult } from "@reduxjs/toolkit";

// tự động thêm default case
store.dispatch(unusedAction());

store.dispatch(increment());
store.dispatch(increment());

store.dispatch(incrementBy(1));
store.dispatch(incrementBy(2));

store.dispatch(decrement());
store.dispatch(decrement());

store.dispatch(decrementBy(1));
store.dispatch(decrementBy(2));

store.dispatch(
    addItem({ productId: 1, productName: "Macbook", quantity: 1, price: 1299 })
);
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(
    addItem({ productId: 2, productName: "Airpod", quantity: 2, price: 199 })
);
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(removeItem({ productId: 1 }));
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(incrementQuantity({ productId: 2 }));
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(decrementQuantity({ productId: 2 }));
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(decrementQuantity({ productId: 2 }));
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(decrementQuantity({ productId: 2 }));
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(
    addItem({ productId: 1, productName: "Macbook", quantity: 1, price: 1299 })
);
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(incrementQuantity({ productId: 2 })); // không có
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(decrementQuantity({ productId: 2 })); // không có
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(setQuantity({ productId: 1, quantity: 10 }));
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(setQuantity({ productId: 2, quantity: 10 })); // không có
console.log("Cart:", selectTotal(store.getState()));

store.dispatch(clear());
console.log("Cart:", selectTotal(store.getState()));

// amazing
store.hello();
store.goodbye();

// async
// mặc định dispatch async thunk trả về một promise
// kết quả nhận được là action, với type, payload
store.dispatch(getTasks()).then((action) => console.log(action));

// thunk cung cấp API unwrap() hoặc unwrapResult()
// cho phép lấy về kết quả gốc của promise
// câu lệnh fulfillWithValue(res.data) => nhận vào data
store
    .dispatch(createTask({ userId: 10, title: "Hello" }))
    .unwrap()
    .then((data) => console.log(data))
    .catch((data) => console.log(data));

// tương tự với unwrapResult
store
    .dispatch(createTask({ userId: 10, title: "Hello" }))
    .then(unwrapResult)
    .then((data) => console.log(data))
    .catch((data) => console.log(data));
