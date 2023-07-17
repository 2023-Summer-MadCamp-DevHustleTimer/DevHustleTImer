import React,{useState} from "react";
import "./Chat.css";

const Chat = () => {

  const [message, setMessage] = useState("");

  const handleSend = () => {
    // 메시지를 전송하는 로직이 이곳에 들어갑니다.
    console.log(message);
    setMessage("");
  }

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 새 줄을 만드는 동작을 막습니다.
      handleSend();       // 메시지를 전송합니다.
    }
  }

  return (
    <div class="cchat">


      <div className="show-text">
        <div className="chat-bubble chat-left">
          안녕하세요.
          안녕하세요.
          안녕하세요.
          안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.안녕하세요.
        </div>
        <div className="chat-bubble chat-left">

          <div>
            김현수
          </div>
          <div>
            <div className="chat-bu">
              안녕2안녕안영ㄴㄹㅇㄴㄹㅇㄴㄹㄴㅇ
            </div>
            <div>
              time
            </div>
          </div>

        </div>
        <div className="chat-bubble chat-right">
          안녕2
        </div>
        <div className="chat-bubble chat-right">
          안녕2
        </div>

        <div className="chat-bubble">
          안녕2
        </div>
        <div className="chat-bubble">
          안녕2
        </div>
        <div className="chat-bubble">
          안녕2
        </div>
        <div className="chat-bubble">
          안녕2
        </div>
        <div className="chat-bubble">
          안녕3
        </div>
        <div className="chat-bubble">
          안녕마지막
        </div>
      </div>
      <div className="input-text">
        <textarea
          type="text"
          placeholder="여기에 채팅을 입력하고 엔터를 누르세요"
          rows={4}
           value={message}
          onChange={handleChange}

          onKeyPress={handleKeyPress}

        // onChange={(e) => setMessage(e.target.value)}
        // onKeyPress={(e) => e.key === 'Enter' ? handleSend() : null}
        />
        <input type="submit" style={{ display: "none" }} />


      </div>

    </div>

  );
}

export default Chat;
