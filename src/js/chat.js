// javascript의 오류를 줄임
"use strict"

const socket = io();

const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector(".send-button");
const displayContainer = document.querySelector(".display-container")

// 이게 이제 채팅 보낼 때 전송 버튼을 누르지 않고 엔터를 통해서 보낼 수 있도록 하는 거
chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode === 13) {
        send()
    }
})

function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    socket.emit("chatting", param)
}

sendButton.addEventListener("click", send)

// 채팅 웹 UI 구성하기 
socket.on("chatting", (data) => {
    console.log(data)
    // 서버에서 데이터를 받을 때마다 LiModel을 찍어낼 것임
    // item변수에 LiModel을 초기화 시키는 것임
    const { name, msg, time } = data;
    const item = new LiModel(name, msg, time);
    // 넘겨받은 데이터로 makeLi메소드를 호출
    item.makeLi()
    // 현재 스크롤 스크롤TO 위치를 읽어서 그 위치로 이동하도록 함
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function LiModel(name, msg, time) {
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <!-- 헐 여기서 /50/50/any이거는 사진 비율 나타내는 거였어 댑악 -->
        <img class="image" src="http://placeimg.com/50/50/any" alt="">
    </span>
    <span class="message">${this.msg}</span>
    <span class="time">${this.time}</span>`;
    li.innerHTML = dom;
    chatList.appendChild(li)
    }
}


