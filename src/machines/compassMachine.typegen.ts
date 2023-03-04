
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "connectingWithDB": "done.invoke.DBMachine.connectingWithDB:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          
        };
        eventsCausingServices: {
          "connectingWithDB": "submitForm";
        };
        matchesStates: "connectingWithDB" | "dbConnectionFailed" | "dbConnectionSuccessful" | "showDBConnectionForm";
        tags: never;
      }
  