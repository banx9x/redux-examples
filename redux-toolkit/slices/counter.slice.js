import { createAction, createReducer } from "@reduxjs/toolkit";

// giống như khai báo một hàm action creator thông thường
// createAction trả về 1 hàm, ví dụ ở đây là increment()
// giá trị truyền vào hàm này khi dispatch action sẽ tự gán cho payload
// ví dụ dispatch(increment(1)) => {type: "counter/increment", payload: 1}
const increment = createAction("counter/increment");
const decrement = createAction("counter/decrement");

// action có thể nhận một tham số thứ 2 là hàm prepare
// cho phép biến đổi payload trước khi kích hoạt reducer
// hàm prepare nhận vào tham số là giá trị của action.payload
// hàm này phải return về một object có thuộc tính payload
const incrementBy = createAction("counter/incrementBy", (value) => {
    return {
        payload: value,
    };
});
const decrementBy = createAction("counter/decrementBy", (value) => {
    return {
        payload: value,
    };
});

const unusedAction = createAction("unused");

// createReducer cho phép thay đổi trực tiếp giá trị của state (với object hoặc array)
const counterReducer = createReducer(
    // trạng thái ban đầu, có thể là bất cứ loại giá trị nào
    // như một object, number, string, ...
    // ở đây chỉ sử dụng 1 giá trị số
    0,
    // tham số thứ 2 là builder callback để tạo reducer
    // builder callback là một hàm, nhận một tham số (builder) là một object
    // cung cấp các API
    // - addCase: tương tự switch case
    // - addMatcher: thêm các trường hợp so sánh đặc biệt, thay vì mặc định chỉ so sánh action.type
    // - addDefaultCase: tương tự switch default
    // thứ tự addCase -> addMatcher -> addDefaultCase
    (builder) =>
        builder
            // addCase nhận vào 2 tham số, tham số đầu tiên là action
            // tham số thứ 2 là reducer function
            // reducer nhận 2 tham số state hiện tại và action
            // mặc định, mỗi action sẽ chỉ kích hoạt một case duy nhất
            .addCase(increment, (state, action) => state + 1)
            .addCase(decrement, (state, action) => state - 1)
            .addCase(incrementBy, (state, action) => state + action.payload)
            .addCase(decrementBy, (state, action) => state - action.payload)
            // addMatcher tương tự với addCase
            // tuy nhiên tham số đầu tiên là một hàm matcher
            // hàm matcher nhận vào action, cho phép viết logic tùy chỉnh để đánh giá action
            // sử dụng matcher cho phép bồi thêm nhiều phát :) với cùng 1 action
            .addMatcher(
                (action) => {
                    const isSpecialCase =
                        action.type == incrementBy && action.payload % 2 == 0;

                    if (isSpecialCase) {
                        console.log("Trường hợp đặc biệt, bồi thêm phát nữa");
                    }

                    return isSpecialCase;
                },
                (state, action) => state * 2
            )
            .addMatcher(
                (action) => {
                    const isSpecialCase =
                        action.type == decrementBy && action.payload % 2 == 0;

                    if (isSpecialCase) {
                        console.log("Trường hợp đặc biệt, bồi thêm phát nữa");
                    }

                    return isSpecialCase;
                },
                (state, action) => state / 2
            )
);

export { increment, incrementBy, decrement, decrementBy, unusedAction };
export default counterReducer;
