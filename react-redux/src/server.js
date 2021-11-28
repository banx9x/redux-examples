import { createServer, Model } from "miragejs";

createServer({
    models: {
        todo: Model,
    },

    seeds(server) {
        server.create("todo", { title: "Learn Redux" });
        server.create("todo", { title: "Learn Redux Advance" });
        server.create("todo", { title: "Learn Redux Thunk" });
    },

    routes() {
        this.namespace = "api";
        this.timing = 1500;

        this.get("/todos", (schema) => {
            return schema.todos.all();
        });

        this.post("/todos", (schema, request) => {
            const { title } = JSON.parse(request.requestBody);
            return schema.todos.create({ title });
        });

        this.delete("/todos", async (schema) => {
            return;
        });

        this.delete("/todos/:id", (schema, request) => {
            const id = request.params.id;

            return schema.todos.find(id).destroy();
        });
    },
});
