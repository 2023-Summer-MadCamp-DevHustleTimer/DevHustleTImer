import React, {useState} from "react";
import "./WhenToMeet.css";

const Chat = () => {
    const numbers = 7;
    const yn = 48;
  
    const [selectedArr, setSelectedArr] = useState([]);
    const [canSelect, setCanSelect] = useState(false);
    const grid = [];
  
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
        <p>
          {" "}
          <b> When-To-Meet? </b>
          <br />
          than pass the<b> mouse over </b>the squares you want to select.
          <br />
          To <b>quit click the Control Key again</b>
        </p>

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
                        ? "#7A4CEB"
                        : "white",
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
            style={{ width: "100px", margin: "0 auto" }}
            onClick={() => setSelectedArr([])}
          >
            Clear
          </button>
          <button
            style={{ width: "100px", margin: "0 auto" }}
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
      </div>
    );
  }

export default Chat;
