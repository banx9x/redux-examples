import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetRemindersQuery } from "./services/base.service";
import {
    useAddReminderMutation,
    useDeleteReminderMutation,
} from "./services/reminder.service";
import {
    selectReminders,
    selectTagShowing,
    filterBy,
} from "./store/reminder.slice";
import { selectTags } from "./store/tag.slice";

function App() {
    // Query hooks tự động gọi API và load dữ liệu
    const {
        isLoading, // Trạng thái đang gửi request (chỉ lần đầu tiên)
        isFetching, // Trạng thái đang gửi request (bao gồm cả lần đầu tiên và những lần sau)
        error, // Lỗi khi thực hiện request
        data, // Kết quả trả về từ request
        refetch, // Hàm cho phép thực hiện lại việc gửi request
        // Một số giá trị khác: https://redux-toolkit.js.org/rtk-query/usage/queries#frequently-used-query-hook-return-values
    } = useGetRemindersQuery(
        {}, // các giá trị truyền cho query() để tùy chỉnh URL
        {
            // Các tùy chọn điều chỉnh hành vi khi gọi API
            skip: false, // Nếu true, không gọi API ở lần render này
            pollingInterval: 0, // Tự động gọi API mỗi (miliseconds), 0 là off
            // Một số options khác: https://redux-toolkit.js.org/rtk-query/usage/queries#query-hook-options
        }
    );

    if (error) <p>Ooops! Unexperted error :(</p>;

    return (
        <div className="container">
            <h1 className="heading">RTK Query Example</h1>

            {isFetching ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Filter />
                    <Form />
                    <Reminders />
                </>
            )}
        </div>
    );
}

function Filter() {
    const dispatch = useDispatch();
    const tagShowing = useSelector(selectTagShowing);
    const tags = useSelector(selectTags);

    return (
        <div className="filter">
            <label htmlFor="tags">Show reminders by tag: </label>
            <select
                id="tags"
                value={tagShowing}
                onChange={(e) => dispatch(filterBy(e.target.value))}
            >
                <option value="">All</option>
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

function Form() {
    // Mutation hooks không tự động gọi API như Query hooks
    // Mutations trả về một array
    const [
        addReminder, // Hàm để kích hoạt việc gửi request
        // Giá thị thứ 2 là object chứa kết quả của request
        {
            isLoading, // Trạng thái gửi request
            error, // Lỗi nếu có
            data, // Kết quả
            // https://redux-toolkit.js.org/rtk-query/usage/mutations#frequently-used-mutation-hook-return-values
        },
    ] = useAddReminderMutation();
    const tags = useSelector(selectTags);
    const initialState = {
        text: "",
        tagId: tags[0].id,
    };
    const [reminder, setReminder] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();

        addReminder(reminder).then(() => setReminder(initialState));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="header">New reminder</h2>

            <input
                type="text"
                value={reminder.text}
                onChange={(e) =>
                    setReminder({ ...reminder, text: e.target.value })
                }
            />
            <select
                name=""
                value={reminder.tagId}
                onChange={(e) =>
                    setReminder({ ...reminder, tagId: e.target.value })
                }
            >
                {tags.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.name}
                    </option>
                ))}
            </select>
            <button>{isLoading ? "Adding..." : "Add"}</button>
        </form>
    );
}

function Reminders() {
    const reminders = useSelector(selectReminders);

    return (
        <div className="reminders">
            <h2 className="heading">Reminders</h2>

            <ul className="list">
                {reminders.map((reminder) => (
                    <ReminderItem key={reminder.id} reminderId={reminder.id} />
                ))}
            </ul>
        </div>
    );
}

function ReminderItem({ reminderId }) {
    const tags = useSelector(selectTags);
    const [deleteReminder] = useDeleteReminderMutation();
    const reminder = useGetRemindersQuery(
        {},
        {
            // selectFromResult cho phép component con sử dụng cùng query với component cha
            // Nhưng sẽ không phải gửi lại request, mà tách phần dữ liệu có sẵn để sử dụng
            selectFromResult: ({ data }) =>
                data.reminders.find((reminder) => reminder.id == reminderId),
        }
    );

    return (
        <li onClick={() => deleteReminder(reminder.id)}>
            <span className="text">{reminder.text}</span>
            <span
                className={"tag"}
                style={{
                    fontSize: "10px",
                    display: "inline-block",
                    background: reminder.tag == 1 ? "#9cbef5" : "#c58383",
                    color: "#fff",
                    padding: "2px 4px",
                    borderRadius: "3px",
                    marginLeft: "5px",
                    cursor: "pointer",
                }}
            >
                {tags.find((tag) => tag.id == reminder.tag).name}
            </span>
        </li>
    );
}

export default App;
