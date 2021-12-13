import api from "./base.service";

// Inject vào root endpoints
api.injectEndpoints({
    endpoints: (builder) => ({
        // Khai báo requests tạo/cập nhật/xóa dữ liệu
        addReminder: builder.mutation({
            query: (data) => ({
                url: "reminders",
                method: "POST",
                body: data,
            }),

            transformResponse: (result) => result.reminder,
        }),

        deleteReminder: builder.mutation({
            query: (id) => ({
                url: `reminders/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

// Cho phép export from here
export const { useAddReminderMutation, useDeleteReminderMutation } = api;

// Re-export api vì nếu import từ base.service sẽ không có addReminder, updateReminder và deleteReminder
export default api;
