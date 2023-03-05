import "./styles.scss";
import DBConnectionForm from "@/components/DBConnectionForm";
import HomePageSidebar from "@/components/HomePageSidebar";
import { CompassContext } from "@/App";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  const [state, send] = CompassContext.useActor();

  console.log(state.value);

  useEffect(() => {
    if (state.matches("dbConnectionSuccessful")) {
      send('redirectToDBChatSpace');
      navigate("/chat-space");
    }
  }, [state]);

  return (
    <div className="home-screen">
      <div className="sidebar">
        <div className="sidebar-content">
          <HomePageSidebar />
        </div>
      </div>
      {/* DB connection form */}
      <div className="content">
        {/* Connecting with DB */}
        {state.matches("connectingWithDB") && <div>Connecting Database</div>}

        {/* DB connection failed */}
        {state.matches("dbConnectionFailed") && (
          <div>
            <div>Database connection failed</div>
            <button onClick={() => send("retry")}>Retry</button>
          </div>
        )}
        {/* DB connection failed */}
        {state.matches("dbConnectionSuccessful") && (
          <div>
            <div>Database connection Successful</div>
            <div>Redirecting...</div>
          </div>
        )}
        {state.matches("showDBConnectionForm") && <DBConnectionForm />}
      </div>
    </div>
  );
};

export default HomeScreen;
