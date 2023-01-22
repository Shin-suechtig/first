let wordClass = "noun";
let target = words(wordClass);
let targetLen = target.length;
console.log(targetLen);

let body = document.getElementsByTagName("body")[0];
let clsChg = document.getElementById("clsChg");
let display = document.getElementById("display");
let word = document.getElementById("word");
let ans = document.getElementById("ans");
let giveUp = document.getElementById("giveUp");
let result = document.getElementById("result");
let scoreElem = document.getElementById("score");
let wrongsElem = document.getElementById("wrongs");
let replay = document.getElementById("replay");
let playAnother = document.getElementsByClassName("playAnother")[0];
let caution = document.getElementById("caution");
let cntElem = document.getElementById("count");
let footer = document.getElementsByTagName("footer")[0];
let startSound = document.getElementById("startSound");
let corrSound = document.getElementById("corrSound");
let corrSound2 = document.getElementById("corrSound2");
let wrongSound = document.getElementById("wrongSound");

let ansValue;
let pstAnsValue;
let wordIdx;
let tmpWordIdx;
let corrDict;
let corrWord;
let cnt = 0;
let score = 0;
let combo = 0;
let negCombo = 0;
let tmpWrongCnt = 0;
let wrongs = [];
let wrongsLen;
let wrongsHTML;

function randElem(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
function setQuiz(){
    display.style.display = "block";
    scoreElem.style.paddingTop = "";
    wrongsElem.style.display = "none";
    replay.style.display = "none";
    playAnother.style.display = "none";
    caution.style.display = "block";
    cntElem.style.display = "block";
    footer.style.display = "block";
}
function removeQuiz(){
    display.style.display = "none";
    scoreElem.style.paddingTop = "7vh";
    wrongsElem.style.display = "block";
    replay.style.display = "block";
    playAnother.style.display = "block";
    caution.style.display = "none";
    cntElem.style.display = "none";
    footer.style.display = "none";
}
function quiz(){
    tmpWrongCnt = 0;
    if (cnt == 20){
        removeQuiz();
        cnt = 1;
        wrongsLen = wrongs.length;
        if (wrongsLen != 0){
            wrongsHTML = "";
            for (let wrong of wrongs){
                wrongsHTML += `<li>${wrong[0]}: ${target[wrong[1]]["meaning"]}</li>`
            }
            console.log(wrongsHTML)
            wrongsElem.innerHTML = wrongsHTML;
        }
    }else{
        ans.focus();
        ans.value = "";
        setQuiz();
        tmpWordIdx = Math.floor(Math.random() * targetLen);
        while (tmpWordIdx == wordIdx){
            tmpWordIdx = Math.floor(Math.random() * targetLen);
        }
        wordIdx = tmpWordIdx;
        corrDict = target[wordIdx]
        word.innerText = randElem(corrDict["meaning"]);
        corrWord = corrDict["word"];
        console.log(corrWord);
        cnt++;
        cntElem.innerText = cnt;
    }
}
function start(){
    quiz();
    startSound.currentTime = 0;
    startSound.play();
    ans.value = "";
    score = 0;
    scoreElem.innerHTML = 0;
    cnt = 1;
    cntElem.innerText = 1;
    combo = 0;
    negCombo = 0;
    tmpWrongCnt = 0;
    wrongs = [];
    wrongsLen = 0;
    wrongsHTML = "";
}
function submit(){
    ansValue = ans.value;
    if (ansValue == "" || ansValue == pstAnsValue) return;
    if (ansValue == corrWord || (ansValue == "Cafe" && corrWord == "Café")){
        if (cnt == 20){
            corrSound2.play();
        }else{
            corrSound.currentTime = 0;
            corrSound.play();
        }
        combo++;
        negCombo = 0;
        score += Math.floor((1 + combo) * ((combo + 1) ** 3) * (corrWord.length ** 2));
        scoreElem.innerText = score;
        quiz();
        ans.value = "";
    }else{
        whenWrong();
    }
    pstAnsValue = ansValue;
}
function whenWrong(){
    wrongSound.currentTime = 0;
    wrongSound.play();
    if (tmpWrongCnt == 0){
        wrongs.push([corrWord, wordIdx]);
    }
    combo = 0;
    negCombo++;
    tmpWrongCnt++;
    score -= (negCombo + 13) * (211 + (combo ** 5));
    scoreElem.innerText = score;
}
start();
giveUp.addEventListener("click", ()=>{
    whenWrong();
    quiz();
});
replay.addEventListener("click", ()=>{
    start();
    ans.focus();
    ans.value = "";
});
clsChg.addEventListener("click", ()=>{
    if (wordClass == "noun"){
        wordClass = "verb";
        clsChg.innerText = "V";
    }else{
        wordClass = "noun";
        clsChg.innerText = "N";
    }
    target = words(wordClass);
    targetLen = target.length;
    start();
});
document.addEventListener('keypress', (e) => {
    if (e.key == "Enter") submit();
});