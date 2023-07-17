import React, { useEffect, useState } from "react";
import "./Chat.css";
import axios from "axios";

const Chat = () => {

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([],);

  useEffect(() => {

  }, []);

  const handleSend = async () => {
    // 메시지를 전송하는 로직이 이곳에 들어갑니다.
    console.log(message);
    try {
      let response = await axios.get('http://localhost:3001/api/me');
      await axios.post('http://localhost:3001/api/message', {
        text: message,
      })

    } catch (error) {
      console.error("error")
      //  console.log(error.response.data);
    }

    setMessage("");
  }

  const handleChange = async (e) => {
    setMessage(e.target.value);

    // test
    try {
      let response = await axios.get('http://localhost:3001/api/message');
      // console.log(response.data);
      setMessageList(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 새 줄을 만드는 동작을 막습니다.
      handleSend();       // 메시지를 전송합니다.
    }
  }
  const renderChatBubbles = () => {
    let reversedMessageList = [];
  for (let i = messageList.length - 1; i >= 0; i--) {
    reversedMessageList.push(messageList[i]);
  }
  console.log(reversedMessageList);
    
    
    return reversedMessageList.map(function (data, index) {
      var lr=(data.me ==true ? 'chat-right' : 'chat-left');
      return (
        <div className={`chat-bubble ${lr}`} key={index}>
          {data.text}
        </div>);
    });
  };
  return (
    <div class="cchat">
      <div className="show-text">
        {renderChatBubbles()}


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
