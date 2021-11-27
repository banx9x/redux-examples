// Ví dụ sử dụng createSlice
import { createSlice, createSelector, nanoid } from "@reduxjs/toolkit";

// Sử dụng createSlice cho phép viết gộp tất cả action, reducer
// createSlice nhận các tham số:
// - name: tên slice, dùng làm prefix cho action được tạo tự động
// - initialState: state mặc định
// - reducers: là một object khai báo các reducer, với mỗi key là một function
// function là reducer, và key là action được tạo tự động
// - extraReducers: là một builder callback, cho phép bổ sung thêm các action
// thường là các action bên ngoài, và là promise
const cart = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        // reducer có thể là một hàm
        clear(state, action) {
            state.length = 0;
        },

        // hoặc một object, cho phép khai báo prepare function
        addItem: {
            reducer(state, action) {
                state.push(action.payload);
            },
            prepare(item) {
                // không thay đổi gì, chỉ là demo thôi
                // prepare phải trả về một object có payload
                return {
                    payload: item,
                };
            },
        },

        removeItem: (state, action) =>
            state.filter((item) => item.productId != action.payload.productId),

        incrementQuantity(state, action) {
            const item = state.find(
                (i) => i.productId == action.payload.productId
            );

            if (item) item.quantity += 1;
        },

        setQuantity(state, action) {
            const item = state.find(
                (i) => i.productId == action.payload.productId
            );

            if (item) item.quantity = action.payload.quantity;
        },

        decrementQuantity(state, action) {
            const idx = state.findIndex(
                (i) => i.productId == action.payload.productId
            );

            if (idx == -1) return;

            if (state[idx].quantity > 1) state[idx].quantity -= 1;
            else state.splice(idx, 1);
        },
    },
});

export default cart.reducer;

// key pop và push được tạo action tự động
export const {
    clear,
    addItem,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    setQuantity,
} = cart.actions;

// createSelector là một tiện ích từ re-select cho phép tạo các bộ chọn phức tạp
// được tích hợp mặc định vào redux toolkit tương tự redux thunk
// tham khảo: https://github.com/reduxjs/reselect
const selectItems = (state) => state.cart;

const selectTotalItems = createSelector(selectItems, (items) =>
    items.reduce((total, item) => (total += item.quantity), 0)
);

const selectSubTotal = createSelector(selectItems, (items) =>
    items.reduce(
        (subTotal, item) => (subTotal += item.quantity * item.price),
        0
    )
);

const selectTax = createSelector(selectSubTotal, (subTotal) =>
    Number((subTotal * 0.1).toFixed(1))
);

const selectTotal = createSelector(
    selectTotalItems,
    selectSubTotal,
    selectTax,
    (totalItems, subTotal, tax) => ({
        items: totalItems,
        subTotal,
        tax,
        total: subTotal + tax,
    })
);

export { selectTotal };
