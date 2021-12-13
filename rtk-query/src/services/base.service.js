// Không tự động tạo hooks
// import { createApi } from "@reduxjs/toolkit/query"

// Tự động tạo các hooks với endpoints đã khai báo
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// fetchBaseQuery là hàm wrapper fetchAPI giúp đơn giản hóa việc viết các requests
// fetchBaseQuery nhận tất cả options tương tự fetchAPI: https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters và bổ sung thêm một số options khác
const baseQuery = fetchBaseQuery({
    // Chỉ định đường dẫn API cơ sở, nếu không cung cấp thì mặc định là đường dẫn gốc
    // Nên luôn chỉ định rõ ràng giá trị này
    baseUrl: "/api/",

    // Thêm thông tin mặc định với mỗi requests
    // Ví dụ authorization, send cookies, ...
    // Cho phép truy cập vào store để lấy thông tin nếu cần thiết
    // Cũng có thể tùy chỉnh headers cho từng request cụ thể
    prepareHeaders: (headers, { getState }) => {
        // Lấy token trong store
        const token = getState().token;

        if (token) headers.set("authorization", `Bearer ${token}`);

        return headers;
    },

    // Hàm ghi đè fetchAPI mặc định nếu muốn
    // fetchFn: () => {},

    // Một số optíons khác từ fetchAPI
    mode: "cors", // "no-cors", "same-origin"

    // Kiểm soát các thông tin như cookies, authorization, tls
    // omit: Loại bỏ tất cả thông tin khỏi request và response nếu có
    // same-origin: Chỉ gửi và sử dụng thông tin khi gửi từ cùng một trang
    // include: Cho phép gửi và nhận với cả cross-origin
    credentials: "include",
});

export const baseApi = createApi({
    // Key reducer để liên kết với store, mặc định là "api"
    reducerPath: "api",

    // Khai báo tag cho các loại dữ liệu liên quan
    tagTypes: ["Tag", "Reminder"],

    // baseQuery sẽ được sử dụng nếu endpoints không khai báo queryFn()
    baseQuery,

    // Khai báo các endpoints (các hành động muốn thực hiện với API)
    // Có 2 dạng cơ bản:
    // - Lấy dữ liệu từ API sử dụng builder.query
    // - Thêm/sửa/xóa dữ liệu từ API sử dụng builder.mutation
    // Trong một ứng dụng sẽ có nhiều endpoints
    // Có thể tách khai báo endpoints ra các files khác
    // Và inject vào endpoints chính này
    endpoints: (builder) => ({
        // Khai báo một request lấy dữ liệu từ API
        getReminders: builder.query({
            // Chỉ sử dụng 1 trong 2 query() hoặc queryFn()
            // Cấu hình cho request, truyền vào baseQuery
            // Query có thể nhận một tham số đầu vào để tùy chỉnh giá trị
            // Nếu cần truyền nhiều giá trị, sử dụng một object
            // query() cũng có thể đơn giản return về một chuỗi url
            query: (args) => ({
                // url join với baseUrl trong baseQuery
                // "lists" => "/api/lists"
                url: "reminders",

                // Tự động parse object thành chuỗi truy vấn
                // Ví dụ: {sortBy: "created"} => ?sortBy=created
                // params: {},

                // Content mặc định tự động chuyển thành JSON
                // Với các loại content khác phải thay đổi headers
                // Requests GET không được đính kèm body
                // body: {},

                // Tùy chỉnh response
                // Mặc định response trả về ngầm định là JSON
                // Có thể chỉ định một chuỗi hoặc hàm để biến đổi
                // LƯU Ý: thường các request DELETE có thể không có dữ liệu trả về sẽ cho kết quả là undefined
                // responseHandler: (response) => {},

                // Mặc định các request có status 2xx là success
                // Còn các status khác sẽ là error
                // Hàm này cho phép tùy chỉnh trạng thái success hoặc error
                // validateStatus: (response, result) => {},
            }),

            // Cho phép biến đổi dữ liệu trước khi lưu vào state
            transformResponse: (result) => result,

            // Tạo các tags cho từng "mảnh" dữ liệu nhận được tương ứng với tagTypes
            // Hàm nhận vào kết quả (sau khi biến đổi), lỗi, và tham số truyền vào hàm query() ở trên
            providesTags: (data, error, args) => {
                if (data) {
                    const { reminders, tags } = data;

                    // Tạo tags cho từng item trong reminder
                    return [
                        ...reminders.map((reminder) => ({
                            type: "Reminder",
                            id: reminder.id,
                        })),
                        ...tags.map((tag) => ({
                            type: "Tag",
                            id: tag.id,
                        })),
                        { type: "Reminder", id: "reminder" },
                        { type: "Tag", id: "tag" },
                    ];
                } else {
                    return [
                        { type: "Reminder", id: "reminder" },
                        { type: "Tag", id: "tag" },
                    ];
                }
            },

            // Lifecycle callback
            onQueryStarted: () => {},
            onCacheEntryAdded: () => {},
        }),
    }),
});

export default baseApi;

// Hooks được tạo tự động tương ứng với keyword trong endpoints
// Tham khảo một số hooks khác: https://redux-toolkit.js.org/rtk-query/usage/queries#hook-types
export const { useGetRemindersQuery } = baseApi;
