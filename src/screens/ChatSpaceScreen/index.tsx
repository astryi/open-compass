import "./styles.scss";
import ChatSpace from "@/components/ChatSpace";
import ChatSpaceSidebar from "@/components/ChatSpaceSidebar";

const ChatSpaceScreen = () => {
  return (
    <div className="chat-space-screen">
      <div className="sidebar">
        <div className="sidebar-content">
          <ChatSpaceSidebar />
        </div>
      </div>

      <div className="content">
        <ChatSpace />
      </div>
    </div>
  );
};

export default ChatSpaceScreen;
