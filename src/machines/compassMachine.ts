import { actions, assign, createMachine } from "xstate";
import { DBType } from "./compassMachine.d";
import { ipcRenderer } from "electron";

export const compassMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBEBCBZAhgYwBYEsA7MAOllwHsB3NAYQsOOwBd8GAxCgJwFsBiWAFcARj3zNOvANoAGALqJQABwqxxbQopAAPRAHYAbCQDMAJgAcARlMBWADQgAnoks3TJN8YAsxvTYC+-g5oWHhEpNgMTKyEUADq4rhofBAMpEQAbhQA1qQhOATEJJGMYCxE8YloCJkU2JisDLJyzVoqao2aSDqIBjYkBmZ6AJx6pl7WljLDXg7OCF42XoHBGAXhxVFlMZXMSah8YFxc3CRKADYNAGbcPCT5YUUl0RUJe9W19Z3Nrd3t6gwtLoEGZjCRhjZjNMvF5zONTJZhnNEMZUSRbCsQA9CqQIMJ6KVygwAMqCbDYOCwK6Cc58LiQfD0lgAFQodFwDWJShwYF+ylUAK6oGBNnMAxGBjG40m0ORCAMMI8mOxGzxBJeHEw+HOkDpYGYXEcfJA-06QJRejFMLcVmGcK8CKRTkQViVQSxa0epAoSjAhFoHOYXJ5AAVMDAUmkSLVcvdPTiSD6-QHOdyKWGYDVCFkvhofvI2gKzd1gaYxh4lpLTNKEbLnQg-GK-Mr4xsk-7A8H0+GwIdjqcLtdbnHQgn2ymg2mwBmwFmcw08-JjaaNOaEKZhiQZAZxuYvHoJrXhsZzHLzMYjM33SqiucKJgIBU0AAZfCwCRanUQPUGo0Fv5FquJaIAAtAqJjWDYri2OYlrDNucqWpY6IBNerZFOQ1Avm+zACGAOosGgy6AYCwHrsMm7mFBSxjIeUwzHKwyWGKGJoaOba+oQaBdr2qRFDGeTod6nHcVOc51AuTRLv+-IdEBwqIJCyEHgiUp0dMcpTJYBgtuxRTtqJPJ9icXBnJczA3LwI7rPpImoDx4m5lJLQySaJFCj0IKmDIJD0cYNijOpDH1pY9EkFeqx6aQd4Pk+GCUj2sDsJ+ur0r+xFyaRCkINpRgyMY1jeAeMrBfMoWIihgTuoQFAQHAWg3mAhaZR5wIgaF7gFbY0GinBCH1mBuk2aQmE0Kg6rbBokg8M1gprjCZ7IahkXDZshI7G8+yzcW2VuL5thylCLHLR6UUkGqWxEoQpLkpS1LnNt8meTYRheAYsFFUFsz1i9J2Ned+KXZ0yXapAj1ZZ5ZheOFfQBTC9qOnK3n9H9QmJpxE48TO4Otb0PmSsMVY1vR33zHozFDV6ZCUGNr7vjja4WHoJCwV4dr7l9Z42P0EWnatMWPrE2HviDX4M2RljQ5WVGBSVJ6MZYzO8-9Bn2VO4vZRYm7k9M1bE3W8wUchrErVTo0hAlMAa89Bibn5AXFUemkyOYOlsfz96C1AFuwLAiWi2DAEtYzMy+dM-my0epMuMxSuoYEQA */
    id: "DBMachine",
    initial: "showDBConnectionForm",
    tsTypes: {} as import("./compassMachine.typegen").Typegen0,
    schema: {
      events: {} as
        | {
            type: "submitForm";
            data: {
              type: DBType;
              url: string;
              port: number;
              userName: string;
              password: string;
            };
          }
        | { type: "updateDBType"; value: DBType }
        | { type: "updateConnectionUrl"; value: string }
        | { type: "updateDBUserName"; value: string }
        | { type: "updateDBUserPass"; value: string }
        | { type: "retry" }
        | { type: "redirectToDBChatSpace" }
        | { type: "showDBList" }
        | { type: "selectDB"; dbId: string }
        | { type: "showChatSpace" },

      services: {} as {
        connectingWithDB: {
          data: any;
        };
        loadDBList: {
          data: any;
        };
        loadDBMessages: {
          data: any;
        };
      },
    },
    context: {
      connectionFormState: {
        dbType: "postgres" as DBType,
        dbConnUrl: "" as string,
        dbUserName: "" as string,
        dbUserPass: "" as string,
        shouldShow: true as boolean,
      },
      dbList: [] as { id: number; name: string }[],
      dbMessageList: [] as Map<
        string,
        {
          promt: { text: string; code: string };
          reply: { text: string; code: string };
          createdAt: Date;
        }
      >[],
    },
    states: {
      showDBConnectionForm: {
        on: {
          submitForm: {
            target: "connectingWithDB",
            actions: assign((context, event) => {
              return {
                connectionFormState: {
                  dbType: event.data.type,
                  dbConnUrl: event.data.url,
                  dbUserName: event.data.userName,
                  dbUserPass: event.data.password,
                  shouldShow: true,
                },
              };
            }),
          },
        },
      },

      connectingWithDB: {
        invoke: {
          src: "connectingWithDB",
          onDone: "dbConnectionSuccessful",
          onError: "dbConnectionFailed",
        },
      },

      dbConnectionSuccessful: {
        on: { redirectToDBChatSpace: "openChatSpacePage" },
      },

      dbConnectionFailed: {
        on: {
          retry: "showDBConnectionForm",
        },
      },

      openChatSpacePage: {
        invoke: {
          src: "loadDBList",
          onDone: "showDBList",
          onError: "loadingDBListFailed",
        },
      },

      showDBList: {
        on: {
          selectDB: "openDBSpace",
        },
      },

      loadingDBListFailed: {
        on: {
          retry: "openChatSpacePage",
        },
      },

      openDBSpace: {
        invoke: {
          src: "loadDBMessages",
          onDone: "showDBMessage",
          onError: "loadingDBMessagesFailed",
        },
      },

      showDBMessage: {},
      loadingDBMessagesFailed: {
        on: {
          retry: "openDBSpace",
        },
      },
    },
  },
  {
    services: {
      loadDBMessages: async () => {},
      loadDBList: async () => {},
      connectingWithDB: async (context) => {
        try {
          const result = await ipcRenderer.invoke("make-db-connection", {
            type: context.connectionFormState.dbType,
            url: context.connectionFormState.dbConnUrl,
            port: 5432,
            userName: context.connectionFormState.dbUserName,
            password: context.connectionFormState.dbUserPass,
          });

          console.log(result);

          if (!result.success) {
            throw new Error(result.message);
          }
        } catch (err) {
          throw err;
        }
      },
    },
  }
);
