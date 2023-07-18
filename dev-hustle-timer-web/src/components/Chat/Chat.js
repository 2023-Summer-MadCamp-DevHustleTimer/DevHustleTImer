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
      if (tmp) {
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
    getMessages(true);
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
    let renderList = [];
    for (let i = 0; i < reversedMessageList.length; i++) {

      var prev = i == reversedMessageList.length - 1 ? null : reversedMessageList[i + 1];
      var current = reversedMessageList[i];
      var lr = current.me ? "chat-right" : "chat-left";
      let dateObject = new Date(current.createdAt);

      let hours = dateObject.getHours().toString().padStart(2, '0'); // 'getHours'를 사용하면 시간대가 반영된 시간을 가져옵니다.
      let minutes = dateObject.getMinutes().toString().padStart(2, '0');
      renderList.push(
        <div className={`chat-bubble ${lr}`} key={i}>
          {current.me == false ?
            <div className="name">
              김현수
            </div> : <span></span>}
          <div className={"content-time" + " " + lr}>
            {current.me == true ? <p className={`time ${lr}`}>
              {hours}:{minutes}
            </p> : <span></span>}
            <p className={`content ${lr}`}>
              {current.text}
            </p>
            {current.me == false ? <p className={`time ${lr}`}>
              {hours}:{minutes}
            </p> : <span></span>}
          </div>
        </div>
      )

    }
    // return reversedMessageList.map(function (data, index) {
    //   var lr = data.me ? "chat-right" : "chat-left";
    //   return (

    //     <div className={`chat-bubble ${lr}`} key={index}>
    //       {index==0 || data.writer.id!=data.writer.id ? 
    //       <div className="name">
    //         김현수
    //       </div>:<span></span>}
    //       <div className="content">
    //         {data.text}
    //       </div>
    //     </div>
    //   );
    // });
    return renderList;
  }; 

  return (
    <div className="cchat">
      <div className="show-text" >
        
        <div className="show-text-inner" >
          <div ref={scrollRef} />
          {/* 스크롤 위치로 이동시킬 요소 */}
          {renderChatBubbles()}
          

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
        />
        <input type="submit" style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default Chat;
