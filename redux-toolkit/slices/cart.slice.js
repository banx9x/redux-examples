// Ví dụ sử dụng createSlice
import { createSlice, createSelector } from "@reduxjs/toolkit";
// Sử dụng database mẫu
import { getProductById } from "../db/product";

// Sử dụng createSlice cho phép viết gộp tất cả action, reducer
// CreateSlice nhận các tham số:
// - name: tên slice, dùng làm prefix cho action được tạo tự động
// - initialState: state mặc định
// - reducers: là một object khai báo các reducer, với mỗi key là một function, actions được tạo tự động theo key
// - extraReducers: là một builder callback, cho phép bổ sung thêm các action, thường là các action bên ngoài, và là promise
const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        // Reducer có thể là một hàm
        // Hoặc là một object, cho phép khai báo thêm prepare function như createAction
        addItem: {
            reducer(state, action) {
                // Kiểm tra xem có item trong giỏ hàng hay chưa
                const item = state.find((item) => item.pid == action.payload);

                // Cho phép chỉnh sửa trực tiếp giá trị của state
                if (item) item.qty++;
                else state.push({ pid: action.payload, qty: 1 });
            },
            // Prepare function nhận giá trị truyền vào khi dispatch action
            prepare(pid) {
                // Không thay đổi gì, chỉ là demo thôi
                // Prepare phải trả về một object có payload
                return {
                    payload: pid,
                };
            },
        },

        removeItem(state, action) {
            // Hoặc return về state mới
            return state.filter((item) => item.pid != action.payload);
        },

        increment(state, action) {
            const item = state.find((item) => item.pid == action.payload);

            item.qty++;
        },

        decrement(state, action) {
            const item = state.find((item) => item.pid == action.payload);

            if (item.qty > 1) item.qty--;
        },

        incrementByAmount(state, action) {
            const item = state.find((item) => item.pid == action.payload.pid);

            if (item) item.qty += action.payload.amount;
        },
    },
});

// createSlice trả về một object với một vài thuộc tính
// - slice.name: tên slice
// - slice.reducer: reducer để config store
// - slice.action: chứa các actions được tạo tự động
export default cartSlice.reducer;

// Các action được tạo tự động theo tên thuộc tính trong reducers
export const { addItem, removeItem, increment, decrement, incrementByAmount } =
    cartSlice.actions;

// createSelector là một tiện ích từ re-select cho phép tạo các bộ chọn phức tạp, được tích hợp mặc định vào redux toolkit tương tự redux-thunk
// Tham khảo thêm: https://github.com/reduxjs/reselect
export const selectItems = (state) =>
    state.cart.map((item) => ({
        ...item,
        // Lấy thông tin chi tiết
        product: getProductById(item.pid),
    }));

// createStore nhận vào một chuỗi hàm input và 1 hàm output
// Các hàm input chạy lần lượt, hàm sau nhận giá trị trả về từ hàm trước đó
// Hàm cuối cùng là output nhận toàn bộ giá trị từ các hàm input

// Ví dụ ở đây, tham số thứ 2 là hàm output, nhận giá trị từ hàm selectItems
export const selectTotalItems = createSelector(selectItems, (items) =>
    items.reduce((total, item) => (total += item.qty), 0)
);

export const selectSubTotal = createSelector(selectItems, (items) =>
    items.reduce(
        (subTotal, item) => (subTotal += item.qty * item.product.price),
        0
    )
);

export const selectTax = createSelector(
    selectSubTotal,
    (subTotal) => Number((subTotal * 0.1).toFixed(1)) // 10% VAT
);

// Ở đây hàm output nhận cả 2 giá trị trả về theo thứ tự của 2 hàm input trước đó
export const selectTotal = createSelector(
    selectSubTotal,
    selectTax,
    (subTotal, tax) => subTotal + tax
);
