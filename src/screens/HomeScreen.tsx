import "./styles.scss";
import DBConnectionForm from "@/components/DBConnectionForm";
import HomePageSidebar from "@/components/HomePageSidebar";

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <div className="sidebar">
        <div className="sidebar-content">
          <HomePageSidebar />
        </div>
      </div>
      {/* DB connection form */}
      <div className="content">
        <DBConnectionForm />
      </div>
    </div>
  );
};

export default HomeScreen;
