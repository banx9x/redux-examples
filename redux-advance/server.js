import { createServer, Response, Model } from "miragejs";

createServer({
    models: {
        todo: Model,
    },

    seeds(server) {
        server.create("todo", { title: "Learn Redux", completed: true });
        server.create("todo", {
            title: "Learn Redux Advance",
            completed: false,
        });
        server.create("todo", { title: "Learn Redux Thunk", completed: false });
    },

    routes() {
        this.namespace = "api";

        this.get(
            "/todos",
            (schema, request) => {
                return schema.todos.all();
            },
            { timing: 1500 }
        );

        this.post(
            "/todos",
            (schema, request) => {
                const todo = JSON.parse(request.requestBody);
                return schema.todos.create(todo);
            },
            { timing: 1500 }
        );

        this.patch(
            "/todos/:id",
            (schema, request) => {
                const id = request.params.id;

                return schema.todos.find(id).update({ completed: true });
            },
            { timing: 1500 }
        );

        this.delete(
            "/todos/:id",
            (schema, request) => {
                const id = request.params.id;

                return schema.todos.find(id).destroy();
            },
            { timing: 1500 }
        );
    },
});
