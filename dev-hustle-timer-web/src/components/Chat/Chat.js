import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import axios from "axios";
import io from "socket.io-client";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:8080");
    getMessages(true);
    

    socket.on("message", (msg) => {
      console.log("new messages");
      getMessages(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function getMessages(tmp) {
    try {
      var response = await axios.get("http://localhost:3001/api/me");
      response = await axios.get("http://localhost:3001/api/message");
      setMessageList(response.data);
      if(tmp){
        scrollToBottom(); 
      }
      // 스크롤을 가장 하단으로 이동
    } catch (error) {
      console.log(error);
    }
  }

  const handleSend = async () => {
    // 메시지를 전송하는 로직이 이곳에 들어갑니다.
    console.log(message);
    try {
      let response = await axios.get("http://localhost:3001/api/me");
      await axios.post("http://localhost:3001/api/message", {
        text: message,
      });
    } catch (error) {
      console.error("error");
      //  console.log(error.response.data);
    }

    setMessage("");
  };

  const handleChange = async (e) => {
    setMessage(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 새 줄을 만드는 동작을 막습니다.
      handleSend(); // 메시지를 전송합니다.
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      //움직이는 방법 다시 연구해보자.
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  };

  const renderChatBubbles = () => {
    let reversedMessageList = [];
    for (let i = messageList.length - 1; i >= 0; i--) {
      reversedMessageList.push(messageList[i]);
    }

    return reversedMessageList.map(function (data, index) {
      var lr = data.me ? "chat-right" : "chat-left";
      return (
        <div className={`chat-bubble ${lr}`} key={index}>
          {data.text}
        </div>
      );
    });
  };

  return (
    <div className="cchat">
      <div className="show-text" >
      
        <div className="show-text-inner" >
         {/* 스크롤 위치로 이동시킬 요소 */}
          {renderChatBubbles()}
          
        </div>
        <div ref={scrollRef} />
      </div>
      <div className="input-text">
        <textarea
          type="text"
          placeholder="여기에 채팅을 입력하고 엔터를 누르세요"
          rows={4}
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <input type="submit" style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default Chat;
