import React ,{useState}from 'react'
import './LandingPage.css'
function LandingPage() {
    const [isCreateClicked, setIsCreateClicked] = useState(false);
    function createClicked(){
        setIsCreateClicked(true);
    }
    if(isCreateClicked){
        return <div>로그인했음요.</div>
    }
    return (<div className="create-or-join">
        <div className="create" onClick={createClicked}>
            <div>이벤트 생성하기</div>
        </div>
        <div className="create"> 
            <div>이벤트 참여하기</div>
        </div>

    </div>)
}
export default LandingPage;