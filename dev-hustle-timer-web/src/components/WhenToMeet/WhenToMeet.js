import React, {useState} from "react";
import "./WhenToMeet.css";

const WhentoMeet = () => {
  const numbers = 7;
  const yn = 48;

  const [subject, setSubject] = useState("수건돌리기 할사람!");
  const [selectedArr, setSelectedArr] = useState([]);
  const [canSelect, setCanSelect] = useState(false);
  const [message, setMessage] = useState("");
  const grid = [];

  const handleChange = (e) => {
    setMessage(e.target.value);
  }
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 새 줄을 만드는 동작을 막습니다.
      handleSend();       // 메시지를 전송합니다.
    }
  }
  const handleSend = () => {
    // 메시지를 전송하는 로직이 이곳에 들어갑니다.
    console.log(message);
    setMessage("");
  }

  for (let i = 0; i < numbers; i++) {
    for (let j = 0; j < yn; j++) {
      grid.push({ x: j + 1, y: i + 1 });
    }
  }
  console.log(selectedArr, canSelect,"selected");

  function handleSelect(g) {
    if (!!canSelect) {
      if (selectedArr?.length > 0) {
        const isAlreadySelected = selectedArr?.filter(
          (s) => s.x === g.x && s.y === g.y
        );
        if (!isAlreadySelected || isAlreadySelected?.length > 0) {
          return;
        }
      }
      setSelectedArr([...selectedArr, g]);

      console.log("selecting...");
    }
  }

  // const onKeyDown = useCallback(
  //   (event) => {
  //     if (event.key === "Control") {
  //       setCanSelect(!canSelect);
  //     }
  //   },
  //   [canSelect]
  // );
  // useEffect(() => {
  //   window.addEventListener("keydown", onKeyDown);
  //   return () => window.removeEventListener("keydown", onKeyDown);
  // }, [onKeyDown]);

  return (
    <div className="when-to-meet-containner">
      <div className="when-to-meet-title"> When-To-Meet? </div>
      <div className="when-to-meet-subject"> {subject} </div>

      <div className="when-to-meet-check-area">
        <div className="day-of-the-week">
          <div className="day-cell">일</div>
          <div className="day-cell">월</div>
          <div className="day-cell">화</div>
          <div className="day-cell">수</div>
          <div className="day-cell">목</div>
          <div className="day-cell">금</div>
          <div className="day-cell">토</div>
        </div>
        <div className="when-to-meet-check-area-row-contents">
          <div className="time-of-the-day">
            {[...Array(24).keys()].map((i) =>{
              return (
                <div className="time-cell">
                  {String(i).padStart(2, "0") + ":00"}
                </div>
              );
            })}
          </div>
          <div className="grid-wrapper">
            {grid?.map((g) => (
              <div
                key={Math.random() + 29389283}
                className="gridBox"
                style={{
                  background:
                    selectedArr.filter((i) => i.x === g.x && i.y === g.y).length > 0
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.06)",
                }}
                onClick={() => setCanSelect(!canSelect)}
                onMouseMoveCapture={() => {
                  handleSelect(g);
                }}
              >
                {/* x: {g.x} y: {g.y} */}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="buttons-wrapper">
        <button
          onClick={() => setSelectedArr([])}
        >
          Clear
        </button>
        <button
          onClick={() => console.log(selectedArr.sort((a, b) => {
            const av = a.y * 10 + a.x;
            const bv = b.y * 10 + b.x;
            if(av > bv) return 1;
            if(av < bv) return -1;
            return 0;
          }))}
        >
          submit
        </button>
      </div>

      <div className="input-text">
        <textarea
          type="text"
          placeholder="새로운 주제를 입력하고 엔터를 누르세요"
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

export default WhentoMeet;
