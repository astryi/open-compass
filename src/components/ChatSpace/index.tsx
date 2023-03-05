import "./styles.scss";

const ChatSpace = () => {
  return (
    <div className="chat-space">
      <section className="display-message-section"></section>
      <section className="prompt-section">
        <form className="prompt-form">
          <input type="text" />
          <button>✈️</button>
        </form>
        <p className="message">This is a beta version for research!!!</p>
      </section>
    </div>
  );
};

export default ChatSpace;
