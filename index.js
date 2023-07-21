import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js'
import {getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js"

const appSettings = {
    databaseURL:"https://scrollfeed-a0d19-default-rtdb.firebaseio.com/"
}  

const app = initializeApp(appSettings);
const database = getDatabase(app);

const happyDataInDB = ref(database, "happy");
const sadDataInDB = ref(database, "sad");
const angryDataInDB = ref(database, "angry");


//happy data
let happyDataArray, hdarrayLength;

function happyDataFetch(){         

       wlcmContainer.src = "happy.gif"  
    onValue(happyDataInDB, function(snapshot){
    
        happyDataArray = snapshot.val();
        hdarrayLength = happyDataArray.length;
        
        aiHappyResponse();
    })
    
}

function aiHappyResponse(){
    let i = hdarrayLength;
    let x = Math.floor(Math.random() * i);

    indexNoUsedCheck(x);
    
}

/////////////// to check index used or not 
let happyDataIndexUsedArr = [];

function indexNoUsedCheck(index){

    if( happyDataIndexUsedArr.length === hdarrayLength){
        happyDataIndexUsedArr = [];
    }

   let check =  happyDataIndexUsedArr.includes(index);

   if(!check){

    happyDataIndexUsedArr.push(index);
    aiMsg = happyDataArray[index];
    typeText(aiMsg);

   }
   else {
    aiHappyResponse();
   }

}

///////////////////////////////////////////////

//sad data
let sadDataArray, sdarrayLength;

function sadDataFetch(){ 

    wlcmContainer.src = "sad.gif";
    onValue(sadDataInDB, function(snapshot){
    
        sadDataArray = snapshot.val();
        sdarrayLength = sadDataArray.length;
        
        aiSadResponse();
    })
    
}

function aiSadResponse(){
    let i = sdarrayLength;
    let x = Math.floor(Math.random() * i);

    sadIndexNoUsedCheck(x);
    
}
/////////////// to check index used or not sad
let sadDataIndexUsedArr = [];

function sadIndexNoUsedCheck(index){

    if( sadDataIndexUsedArr.length === sdarrayLength){
        sadDataIndexUsedArr = [];
    }

   let check =  sadDataIndexUsedArr.includes(index);

   if(!check){

    sadDataIndexUsedArr.push(index);
    aiMsg = sadDataArray[index];
    typeText(aiMsg);
   }
   else {
    aiSadResponse();
   }

}

///////////////////////////////////////////////

//angry data
let angryDataArray, adarrayLength;

function angryDataFetch(){  

    wlcmContainer.src = "angry.gif";
    onValue(angryDataInDB, function(snapshot){
    
        angryDataArray = snapshot.val();
        adarrayLength = angryDataArray.length;
        
        aiAngryResponse();
    })
    
}

function aiAngryResponse(){
    let i = adarrayLength;
    let x = Math.floor(Math.random() * i);
    angryIndexNoUsedCheck(x);
    
}
/////////////// to check index used or not sad
let angryDataIndexUsedArr = [];

function angryIndexNoUsedCheck(index){

    if( angryDataIndexUsedArr.length === adarrayLength){
        angryDataIndexUsedArr = [];
    }

   let check =  angryDataIndexUsedArr.includes(index);

   if(!check){

    angryDataIndexUsedArr.push(index);
    aiMsg = angryDataArray[index];
        typeText(aiMsg);
   }
   else {
    aiAngryResponse();
   }

}

///////////////////////////////////////////////

//user clicked the box or not
const userInputTxt = document.querySelector("#userInputTxt");
const sendUserResponseBtn = document.querySelector("#sendUserResponse");
const aiMsgContainer = document.querySelector("#aiMsgContainer");
const userContainer =  document.querySelector("#user-Container");

let wlcmContainer = document.querySelector("#wlcm-Container");
let aiResponse = document.querySelector("#ai-Response");


let userName; let aiMsg; const typingSpeed = 50; let goodToGo; 

userInputTxt.addEventListener("focus", sessionStarts);
userInputTxt.addEventListener("blur", sessionEnds);

function sessionStarts(){
    aiResponse.textContent ="";
    clearPlaceholderValueD();  
}


function clearPlaceholderValueD(){
    
    aiMsg = "Hi! I'm Jiya and you're?"

    userInputTxt.setAttribute("placeholder", "");
    wlcmContainer.src = "awake.gif";
    aiMsgContainer.style.display = "flex";
    typeText(aiMsg);
    goodToGo = "fetch";

}

function userResponseFetch() {
    goodToGo = undefined;
    sendUserResponseBtn.addEventListener("click", handleUserResponse, { once: true });
    
}

function handleUserResponse() {
    
    userName = userInputTxt.value;

    if (userName == "") {
        aiMsg = "You didn't tell me your name ";
        typeText(aiMsg);
       
    } else {
       
        aiMsg = `hi ${userName} nice to meet you`;
        goodToGo = "handle";
        typeText(aiMsg); 
            
    }
    
}

const feelings = ["&#128516;","&#128546;", "&#128545"]
let feelingsBtns;

function proceed(){
       goodToGo = undefined;
       userInputTxt.style.display = "none";
       aiMsg = `Tell me how're you feeling ${userName}`;
       typeText(aiMsg); 
       
       for(let i=0;i<feelings.length;i++){

          const feelingList = document.createElement("span");
          feelingList.classList.add("feeling-element");
          feelingList.innerHTML = feelings[i]; 
          userContainer.appendChild(feelingList);
            }   
    feelingsBtns = document.querySelectorAll(".feeling-element");
    
    feelingsBtns.forEach(readyToAction);  
    sendUserResponseBtn.textContent = "Reload";
    sendUserResponseBtn.addEventListener("click",newSession);
}



function readyToAction(btn){

  btn.addEventListener("click",userSelectEmoji); 
}

const happy = String.fromCodePoint(128516),
      sad = String.fromCodePoint(128546),
      angry = String.fromCodePoint(128545);

function userSelectEmoji(e){
    if(e.currentTarget.innerText == happy){
         happyDataFetch()
     }

    if(e.currentTarget.innerText == sad){
         sadDataFetch()
     }
   if(e.currentTarget.innerText == angry){
         angryDataFetch()
     }
   
}

//session end

function sessionEnds(){
    userInputTxt.setAttribute("placeholder", "I'm Here To Talk...");
    
}


function newSession(){
    aiMsg = `Goodbye ${userName}... `;
    typeText(aiMsg);
    setTimeout(function(){
        location.reload();
    }, 3000);
}



//typing 

function typeText(textToType) {
    let i = 0;
    aiResponse.textContent ="";
    const typingInterval = setInterval(() => {
        
        aiResponse.textContent += textToType[i];
      i++;
      
      if (i >= textToType.length) {
        clearInterval(typingInterval);
        aiTxtClear();
      }
    }, typingSpeed);
  }
  
 
  function aiTxtClear(){
    if(goodToGo =="handle"){ 
        setTimeout(function(){
            proceed();
        }, 1000);
        }
    if(goodToGo =="fetch"){userResponseFetch() }

  }
  