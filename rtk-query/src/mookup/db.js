import {
    belongsTo,
    createServer,
    hasMany,
    Model,
    RestSerializer,
} from "miragejs";

createServer({
    namespace: "api",

    models: {
        reminder: Model.extend({
            tag: belongsTo(),
        }),
        tag: Model.extend({
            reminders: hasMany(),
        }),
    },

    seeds(db) {
        const home = db.create("tag", { name: "Home" });
        const work = db.create("tag", { name: "Work" });

        db.create("reminder", { tag: home, text: "Shoping" });
        db.create("reminder", { tag: home, text: "Housecleaning" });

        db.create("reminder", { tag: work, text: "Learn RTK Query" });
        db.create("reminder", { tag: work, text: "Write example" });
    },

    serializers: {
        reminder: RestSerializer.extend({
            include: ["tag"],
        }),
    },

    routes() {
        this.timing = 500;

        this.get("/reminders", (schema) => {
            return schema.reminders.all();
        });

        this.post("/reminders", (schema, request) => {
            const { tagId, text } = JSON.parse(request.requestBody);
            const tag = schema.tags.find(tagId);

            return schema.reminders.create({ tag, text });
        });

        this.delete("/reminders/:reminderId", (schema, request) => {
            const { reminderId } = request.params;
            const reminder = schema.reminders.find(reminderId);

            return reminder.destroy();
        });
    },
});
