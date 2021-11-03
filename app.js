const senderInput = document.querySelector("#sender .input_section #text");
const receiverInput = document.querySelector("#receiver .input_section #text");
const senderChat = document.querySelector("#sender #chats");
const receiverChat = document.querySelector("#receiver #chats");
const senderGo = document.querySelector("#sender .send_logo");
const receivergo = document.querySelector("#receiver .send_logo");
const senderStatus = document.querySelector("#sender #status");
const receiverStatus = document.querySelector("#receiver #status");

// for always display bottom of screen
let bottomView = () => {
  let height = senderChat.scrollHeight;
  senderChat.scroll({ top: height, behavior: "smooth" });
  receiverChat.scroll({ top: height, behavior: "smooth" });
};

let chatData = [];

let sendChat = () => {
  let sendValue = senderInput.value;
  // let time = new Date().toLocaleTimeString();
  let time = new Date().toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  }); // to remove seconds from toLocaleTimeString

  let obj = { id: `${chatData.length}`, name: "harshal", text: `${sendValue}` }; //for storing data in array of obj
  chatData.push(obj);
  console.log(chatData);

  let sendItem = `<div class="send_message">
    <p>${sendValue}</p>
    <div class="details">
    <div class="time">${time}</div>
    <i class="fas fa-check-double tick"></i>
    </div>
    </div>`;

  let receivedItem = `<div class="recieved_message">
    <p>${sendValue}</p>
    <div class="time">${time}</div>
    </div>`;

  if (sendValue != "") {
    senderChat.insertAdjacentHTML("beforeend", sendItem);
    receiverChat.insertAdjacentHTML("beforeend", receivedItem);
    bottomView();
  }

  setTimeout(() => {
    let tick = document.querySelectorAll(".tick");
    tick.forEach((e) => (e.style.color = "rgb(99 159 249)"));
  }, 1000);

  senderInput.value = ""; //to clear the input value
  senderGo.innerHTML = `<img src="images/microphone.png">`; //to change logo to microphone
  receiverStatus.innerText = `online`; //to change the status to onlinw from typing
};

let recivedChat = () => {
  let sendValue = receiverInput.value;
  // let time = new Date().toLocaleTimeString();
  let time = new Date().toLocaleTimeString(navigator.language, {
    hour: "2-digit",
    minute: "2-digit",
  }); // to remove seconds from toLocaleTimeString

  let obj = { id: `${chatData.length}`, name: "anil", text: `${sendValue}` }; //for storing data in array of obj
  chatData.push(obj);
  console.log(chatData);

  let sendItem = `<div class="send_message">
    <p>${sendValue}</p>
    <div class="details">
    <div class="time">${time}</div>
    <i class="fas fa-check-double tick"></i>
    </div>
    </div>`;

  setTimeout(() => {
    let tick = document.querySelectorAll(".tick");
    tick.forEach((e) => (e.style.color = "rgb(99 159 249)"));
  }, 1500);

  let receivedItem = `<div class="recieved_message">
    <p>${sendValue}</p>
    <div class="time">${time}</div>
    </div>`;

  if (sendValue != "") {
    //To check input has a value
    receiverChat.insertAdjacentHTML("beforeend", sendItem);
    senderChat.insertAdjacentHTML("beforeend", receivedItem);
    bottomView();
  }

  receiverInput.value = ""; //to clear the input value
  receivergo.innerHTML = `<img src="images/microphone.png">`; //to change logo to microphone
  senderStatus.innerText = `online`; //to change the status to onlinw from typing
};
// for triggered event on pressing enter key
document.addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    //checks whether the pressed key is "Enter"
    if (senderInput.value != "") {
      sendChat();
    } else if (receiverChat.value != "") {
      recivedChat();
    }
  }
});

// to change the send logo and display typing
var isTyping = false;
var isNotTyping;

function sendIsNotTyping() {
  receiverStatus.innerText = `online`;
  senderStatus.innerText = `online`;
  isTyping = false;
}

senderInput.addEventListener("input", () => {
  if (!isTyping) {
    receiverStatus.innerText = `typing..`;
    isTyping = true;
  }

  if (isNotTyping != undefined) clearTimeout(isNotTyping);
  isNotTyping = setTimeout(sendIsNotTyping, 900);

  if (senderInput.value != "") {
    senderGo.innerHTML = `<img src="images/send.png">`;
  } else {
    senderGo.innerHTML = `<img src="images/microphone.png">`;
  }
});

receiverInput.addEventListener("input", () => {
  if (!isTyping) {
    senderStatus.innerText = `typing..`;
    isTyping = true;
  }

  if (isNotTyping != undefined) clearTimeout(isNotTyping);
  isNotTyping = setTimeout(sendIsNotTyping, 900);

  if (receiverInput.value != "") {
    receivergo.innerHTML = `<img src="images/send.png">`;
  } else {
    receivergo.innerHTML = `<img src="images/microphone.png">`;
  }
});

// to chose the image
const sender_chooseFile = document.querySelector(".sender-choose-file");
const receiver_chooseFile = document.querySelector(".receiver-choose-file");

let sendImgData = () => {
  const files = sender_chooseFile.files[0];
  if (files) {
    let time = new Date().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    }); // to remove seconds from toLocaleTimeString

    let src = URL.createObjectURL(files); // to get global path of selected images
    let obj = { id: `${chatData.length}`, name: "harshal", Image: `${src}` }; //for storing in array of obj.
    chatData.push(obj);
    console.log(chatData);

    let sendItem = `<div class="send_message">
        <p></p>
        <img src="${src}" alt="image">
        <div class="details">
        <div class="time">${time}</div>
        <i class="fas fa-check-double tick"></i>
        </div>
        </div>`;

    let receivedItem = `<div class="recieved_message">
        <p></p>
        <img src="${src}" alt="image">
        <div class="time">${time}</div>
        </div>`;

    setTimeout(() => {
      let tick = document.querySelectorAll(".tick");
      tick.forEach((e) => (e.style.color = "rgb(99 159 249)"));
    }, 1500);

    senderChat.insertAdjacentHTML("beforeend", sendItem);
    receiverChat.insertAdjacentHTML("beforeend", receivedItem);
    setTimeout(() => {
      bottomView();
    }, 50);
  }
};
let recievedImgData = () => {
  const files = receiver_chooseFile.files[0];
  if (files) {
    let src = URL.createObjectURL(files); // to get global path of selected images
    let obj = { id: `${chatData.length}`, name: "anil", Image: `${src}` }; //for storing in array of obj.
    chatData.push(obj);
    console.log(chatData);

    let time = new Date().toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    }); // to remove seconds from toLocaleTimeString

    let sendItem = `<div class="send_message">
        <p></p>
        <img src="${src}" alt="image">
        <div class="details">
        <div class="time">${time}</div>
        <i class="fas fa-check-double tick"></i>
        </div>
        </div>`;

    let receivedItem = `<div class="recieved_message">
        <p></p>
        <img src="${src}" alt="image">
        <div class="time">${time}</div>
        </div>`;

    setTimeout(() => {
      let tick = document.querySelectorAll(".tick");
      tick.forEach((e) => (e.style.color = "rgb(99 159 249)"));
    }, 1500);

    receiverChat.insertAdjacentHTML("beforeend", sendItem);
    senderChat.insertAdjacentHTML("beforeend", receivedItem);
    setTimeout(() => {
      bottomView();
    }, 50);
  }
};

sender_chooseFile.addEventListener("change", sendImgData);
receiver_chooseFile.addEventListener("change", recievedImgData);

senderGo.addEventListener("click", sendChat);
receivergo.addEventListener("click", recivedChat);

//for scroll to bottom
let sender_down = document.querySelector("#sender .down_arrow");
let receiver_down = document.querySelector("#receiver .down_arrow");

senderChat.onscroll = function () {
  scrollFunction();
};
receiverChat.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (senderChat.scrollTop + 390 + 50 < senderChat.scrollHeight) {
    //I subtracted 390 because the height of chat dic is 390px and 50px is for extra height.
    sender_down.style.display = "block";
  } else {
    sender_down.style.display = "none";
  }

  if (receiverChat.scrollTop + 385 + 50 < receiverChat.scrollHeight) {
    //I subtracted 390 because the height of chat dic is 390px and 50px is for extra height.
    receiver_down.style.display = "block";
  } else {
    receiver_down.style.display = "none";
  }
}

sender_down.addEventListener("click", () =>
  senderChat.scroll({ top: senderChat.scrollHeight, behavior: "smooth" })
);
receiver_down.addEventListener("click", () =>
  receiverChat.scroll({ top: receiverChat.scrollHeight, behavior: "smooth" })
);

// for toggle switch
const toggle = document.getElementById("checkbox");

toggle.addEventListener("change", () => {
  //change the background of the body
  document.body.classList.toggle("active");
  document.querySelectorAll(".data").forEach((e) => e.classList.toggle("dark"));
  document
    .querySelectorAll(".header")
    .forEach((e) => e.classList.toggle("dark"));
  document
    .querySelectorAll(".footer .input_section")
    .forEach((e) => e.classList.toggle("dark"));
  document
    .querySelectorAll(".chat_section")
    .forEach((e) => e.classList.toggle("dark"));
});
