const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
refreshBtn=document.querySelector(".refresh-word"),
checkBtn=document.querySelector(".buttons .check-word"),
inputText=document.querySelector(".content input"),
timerTag=document.querySelector(".time span b");
let randomObj;

let time,timer;
const initGame = () => {
    randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for(let i=wordArray.length-1; i >0;i--){
        let j = Math.floor(Math.random() * (i+1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    time=30;
 timer = setInterval(initTimer, 1000);
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    wordText.style.color = "";
    inputText.value="";
    inputText.readOnly = false;
    inputText.style.color = "";    
    refreshBtn.innerText="Refresh Word";
    refreshBtn.style.backgroundColor=""; 
    refreshBtn.style.width=""; 
}

function initTimer(){
    if(time >0){
        time--;
        timerTag.innerText=time;
    }
    else{
       clearInterval(timer); 
       inputText.value="Time's up!";
       inputText.style.color = "red";
       inputText.readOnly = true;
       wordText.innerHTML=randomObj.word+"✘";
       wordText.style.color = "red";
    }
}

function refreshWord(){
    clearInterval(timer); 
    initGame();
}

function checkWord(){
if(randomObj.word===inputText.value){
    inputText.readOnly = true;
    wordText.innerText=randomObj.word + "✓";
    wordText.style.color = "green";
    refreshBtn.innerText="Next";
    refreshBtn.style.backgroundColor="green";
    refreshBtn.style.width="100px";
    clearInterval(timer); 
}else{
    wordText.innerHTML+="✘";
    wordText.style.color = "red";
    inputText.value="";
    inputText.placeholder = "Try Again!";
}
}

initGame();

refreshBtn.addEventListener("click", refreshWord);
checkBtn.addEventListener("click",checkWord);