import { actions, assign, createMachine } from "xstate";
import { DBType } from "./compassMachine.d";

export const compassMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBEBCBZAhgYwBYEsA7MAOllwHsB3NAYQsOOwBd8GAxCgJwFsBiWAFcARj3zNOvANoAGALqJQABwqxxbQopAAPRACYAHAEYSAZkNGZBvQHYAbKaMBWPQBoQAT0RGjNkjZtTABZLJxk9ELsgpwBfGPc0LDwiUmwGJlZCKAB1cVw0PggGUiIANwoAa1JEnAJiEjTGMBYiHLy0BDKKbExWBlk5Aa0VNT7NJB1EO3sSAE4nUxl5gyCDOwMbdy8EI1t-INnZ0wMnWZXTGycguISMWpSG9ObMtuZ81D4wLi5uEiUAG16ADNuDwSDVkvVGhlWrk3h0uj0xgMhhMRuoGFpdAhpnY5gslk4VmsNltvBs5kY7NSZHY9NNZnYZDYbiAIXVSBBhPQmi0GABlQTYbBwWBAwT-QrFMjMXrVO6Qzncp58wiC4Wi8X-VHKVQY8agbGMoIkA6HBx6PRGWY2a1khDGEhhGQumRBdbMjbXeJshUckhcnkwjiYfD-SB8LhgZhcDw6kDosZYxAGcL+Ixe0yzcLU072wymOb2Jx2JyBazTOI+wgUCBwLTslLDPVJibYgC0dntndZjfq5GodBVY0kPGbow0yYQQTcnm8BxIVnM812tMCLJ9fdSw9h7VQ4-1U6CjhIuwONhO0Vmegu9p8fjNjIzV1L0Q3tyS-sDO4FQpFsDFCUD1bQ1EGzGR-FLOxLD0N15htO9TELQ5DlOWwVhdFxez9B5v15EdQ3DCBgMnNswJdSCSxguDTk2OcdmvU0UOsWkrBkDMqxiIA */
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
        | { type: "updateDBUserPass"; value: string },
    },
    context: {
      connectionFormState: {
        dbType: "postgres" as DBType,
        dbConnUrl: "" as string,
        dbUserName: "" as string,
        dbUserPass: "" as string,
        shouldShow: true as boolean,
      },
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
          }
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
        onDone: {
          target: "dbConnectionSuccessful",
        },
      },
      dbConnectionFailed: {
        on: {
          retry: "showDBConnectionForm",
        },
      },
    },
  },
  {
    services: {
      connectingWithDB: async (context) => {
        return await { connected: true };
      },
    },
  }
);
