import "./styles.scss";

const ChatSpaceSidebar = () => {
  return (
    <div className="chat-space-sidebar">
      <div className="top-section">
        <h2>Databases</h2>
        {/* <button>End connection</button> */}
      </div>
      <div className="db-shortcuts">
        <ul>
          <li>Business DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>My personal DB (Secret)</li>
          <li>X org's Database</li>
          <li>Unnamed</li>
        </ul>
      </div>
      <div className="bottom-shortcuts">
        <ul>
          <li>Clear conversations</li>
          <li>Light mode</li>
          <li>Updated & FAQ</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatSpaceSidebar;
