
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "connectingWithDB": "done.invoke.DBMachine.connectingWithDB:invocation[0]";
"loadDBList": "done.invoke.DBMachine.openChatSpacePage:invocation[0]";
"loadDBMessages": "done.invoke.DBMachine.openDBSpace:invocation[0]";
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
"loadDBList": "redirectToDBChatSpace" | "retry";
"loadDBMessages": "retry" | "selectDB";
        };
        matchesStates: "connectingWithDB" | "dbConnectionFailed" | "dbConnectionSuccessful" | "loadingDBListFailed" | "loadingDBMessagesFailed" | "openChatSpacePage" | "openDBSpace" | "showDBConnectionForm" | "showDBList" | "showDBMessage";
        tags: never;
      }
  