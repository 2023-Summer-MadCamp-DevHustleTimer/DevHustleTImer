import React, { useState } from 'react'
import './LandingPage.css'
import DatePicker from "react-datepicker";
import axios from 'axios';
function LandingPage() {
    const [isCreateClicked, setIsCreateClicked] = useState(false);
    const [isJoinClicked, setIsJoinClicked] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const [inputNickNameValue, setInputNickNameValue] = useState('');



    const [title, setTitle] = useState('');
    const [subtitle,setSubtitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [nickname, setNickname] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        if (e.target.value.length === 4) {
            console.log('You entered 4 characters.' + e.target.value);
            // Do something here when 4 characters are entered
        }
    };
    const handleInputNickNameChange = (e) => {
        setInputNickNameValue(e.target.value);
    }

    function createClicked() {
        setIsCreateClicked(true);
    }
    function joinClicked() {
        setIsJoinClicked(true);
    }

    if (isCreateClicked) {
        return (<div className="create-main-box">

            <div className="sub-box">
                <input
                    placeholder='이벤트 제목 입력해주세요'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
            </div>
            <div className="sub-box">
                <input
                    placeholder='이벤트 내용 입력해주세요'
                    value={subtitle}
                    onChange={e => setSubtitle(e.target.value)}
                />
            </div>
            <div className="sub-box">
                <input
                    type="date"
                    placeholder='이벤트 종료 날짜를 입력해주세요'
                    value={date}
                    onChange={e => setDate(e.target.value)}
                />
            </div>
            <div className="sub-box">
                <input
                    type="time"
                    placeholder='이벤트 종료 시간을 입력해주세요'
                    value={time}
                    onChange={e => setTime(e.target.value)}
                />
            </div>
            <div className="sub-box">
                <input
                    placeholder='닉네임을 입력해주세요'
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                />
            </div>
            <div className='sub-box' onClick={async () => {
                console.log("방 생성 완료");
                console.log(time);
                console.log(date);

                try {
                    const newDate = new Date(date + " " + time);
                    let response = await axios.post('http://localhost:3001/api/event/create', {
                        nickname: nickname,
                        title: title,
                        subtitle: subtitle,
                        endTime: newDate,
                    });
                    window.location.reload();
                    console.log(response.data)
                } catch (error) {
                    console.log("error")
                    console.log(error.response.data);
                }

            }}>
                <div>
                    생성 하기
                </div>
            </div>
            <div className='sub-box' onClick={() => { setIsCreateClicked(false) }}><div>
                뒤로 가기</div></div>

        </div>)
    }
    if (isJoinClicked) {
        return <div className="join-main-box">
            <div className="room">
                <input placeholder='입력 코드를 입력해주세요' value={inputValue}
                    onChange={handleInputChange} ></input>
            </div>
            <div className="nickname">
                <input placeholder='닉네임을 입력해주세요' value={inputNickNameValue}
                    onChange={handleInputNickNameChange} ></input>
            </div>
            <div className="back" onClick={async () => {
                console.log("참여버튼 눌렀어요.");
                setInputNickNameValue('');
                setInputValue('');
                
                try {
                    const newDate = new Date(date + " " + time);
                    let response = await axios.post('http://localhost:3001/api/event/join', {
                        nickname: nickname,
                        eventNum:inputValue,
                    });
                    window.location.reload();
                    // console.log(response.data)
                } catch (error) {
                    console.log("error")
                     console.log(error.response.data);
                }

            }}>

                <div>참여 하기</div>
            </div>
            <div className="back" onClick={() => {
                setIsJoinClicked(false);
                setInputNickNameValue('');
                setInputValue('');
            }}>

                <div>뒤로 가기</div>
            </div>
        </div>
    }
    return (<div className="create-or-join">
        <div className="create" onClick={createClicked}>
            <div>이벤트 생성하기</div>
        </div>
        <div className="create" onClick={joinClicked}>
            <div>이벤트 참여하기</div>
        </div>

    </div>)
}
export default LandingPage;