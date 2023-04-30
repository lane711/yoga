import { createYoga, createSchema, Repeater } from "graphql-yoga";

declare const KVDATA: KVNamespace;

export const graphql = createYoga({
    schema: createSchema({
      typeDefs: /* GraphQL */ `
        scalar File
        scalar JSON
        type Query {
          todoList(limit: Int = 10, cursor: String): TodoList
          readFileAsText(name: String): String
          readFileAsJson(name: String): JSON
        }
        type Mutation {
          addTodo(content: String, expiration: Int): ID
          deleteTodo(id: ID): Boolean
          uploadFile(file: File): Boolean
          deleteFile(name: String): Boolean
        }
        type Subscription {
          scheduled: ScheduledEvent
          time: String
        }
        type TodoList {
          keys: [TodoKeyInfo]
          list_complete: Boolean
          cursor: String
        }
        type TodoKeyInfo {
          name: String
          expiration: Int
          value: String
        }
        type ScheduledEvent {
          cron: String
          scheduledTime: Int
        }
      `,
      resolvers: {
        Query: {
          todoList: async (_, { limit = 10, cursor }) =>
            KVDATA.list({
              prefix: "todo_",
              limit,
              cursor,
            }),
          readFileAsText: (root, args) => KVDATA.get(args.name, "text"),
          readFileAsJson: (root, args) => KVDATA.get(args.name, "json"),
        },
        TodoKeyInfo: {
          value: ({ name }: any) => KVDATA.get(name, "text"),
        },
        Mutation: {
          addTodo: async (_, { content }) => {
            const id = Date.now().toString();
            await KVDATA.put(`todo_${Date.now()}`, content);
            return id;
          },
          deleteTodo: (_, { id }) => {
            KVDATA.delete(`todo_${id}`);
            return true;
          },
          uploadFile: async (_, { file }: { file: File }) => {
            console.log("file", file);
            const name = file.name;
            const arrayBuffer = await file.arrayBuffer();
            await KVDATA.put(`textFile_${name}`, arrayBuffer);
            return true;
          },
          deleteFile: async (_, { name }) => {
            KVDATA.delete(`textFile_${name}`);
            return true;
          },
        },
        Subscription: {
          time: {
            subscribe: () =>
              new Repeater((push, end) => {
                const interval = setInterval(
                  () => push(new Date().toISOString()),
                  1000
                );
                end.then(() => clearInterval(interval));
              }),
            resolve: (value) => value,
          },
          scheduled: {
            subscribe: () =>
              new Repeater((push, end) => {
                const eventListener = (event: ScheduledEvent) => push(event);
                self.addEventListener("scheduled", eventListener);
                end.then(() =>
                  self.removeEventListener("scheduled", eventListener)
                );
              }),
            resolve: (event) => event,
          },
        },
      },
    }),
    maskedErrors: false,
  });
  