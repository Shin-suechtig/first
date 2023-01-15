const WHOLE = whole();
let target = [];
for (const i of WHOLE){
    for (const j of i){
        for (const k of j){
            target.push({"word":k["word"], "meaning":k["meaning"], "gender":k["gender"]})
        }
    }
}
let body = document.getElementsByTagName("body")[0];
let targetLen = target.length;
console.log(targetLen);
let display = document.getElementById("display");
let question = document.getElementById("question");
let ans = [document.getElementById("ans_0"), document.getElementById("ans_1"), document.getElementById("ans_2"), document.getElementById("ans_3")]
let result = document.getElementById("result");
let scoreElemA = document.getElementById("scoreA");
let scoreElemB = document.getElementById("scoreB");
let corrCntElemA = document.getElementById("corrCntA");
let wrongCntElemA = document.getElementById("wrongCntA");
let corrCntElemB = document.getElementById("corrCntB");
let wrongCntElemB = document.getElementById("wrongCntB");
let perfect = document.getElementById("perfect");
let imperfect = document.getElementById("imperfect");
let replay = document.getElementById("replay");
let corrSound = document.getElementById("corrSound");
let corrSound2 = document.getElementById("corrSound2");
let wrongSound = document.getElementById("wrongSound");

let wordIdx;
let tmpWordIdx;
let corrIdx;
let wrongIdx = [];
let tmpWrongIdx;
let cnt = 0;
let corrCnt = 0;
let wrongCnt = 0;
let wrongs = [];
let wrongsLen;
let mistakenWordIdx;
let wrongsTxt;
function setQuiz(){
    scoreElemA.style.display = "block";
    display.style.display = "table";
    result.style.display = "none";
    replay.style.display = "none";
}
function removeQuiz(){
    display.style.display = "none";
    result.style.display = "block";
    replay.style.display = "block";
}
function quiz(){
    if (cnt == 10){
        removeQuiz();
        cnt = 0;
        wrongsLen = wrongs.length;
        if (wrongsLen == 0){
            perfect.style.display = "block";
            imperfect.style.display = "none";
            scoreElemA.style.display = "none";
            scoreElemB.style.display = "none";
            body.style.animation = "gaming 2s linear infinite";
            result.style.animation = "gaming 2s linear infinite";
            perfect.style.animation = "gaming 2s linear infinite";
            return [null, null];
        }else{
            perfect.style.display = "none";
            imperfect.style.display = "block";
            scoreElemA.style.display = "none";
            scoreElemB.style.display = "block";
            corrCntElemB.innerText =  corrCnt;
            wrongCntElemB.innerText = wrongCnt;
            wrongsTxt = "";
            for (let i=0; i<wrongsLen; ++i){
                mistakenWordIdx = wrongs[i][0];
                wrongsTxt += "<span style=\"color: red;\">'" + target[mistakenWordIdx]["word"] + "'</span>" + " is '<span style=\"color: red;\">"
                    + target[mistakenWordIdx]["meaning"] + "'</span>, not '" + wrongs[i][1] + "'.<br>"
            }
            imperfect.innerHTML = wrongsTxt.slice(0,-4);
            return [null, null];
        }
    }else{
        setQuiz();
        tmpWordIdx = Math.floor(Math.random() * targetLen);
        while (tmpWordIdx == wordIdx){
            tmpWordIdx = Math.floor(Math.random() * targetLen);
        }   
        wordIdx = tmpWordIdx;
        corrIdx = Math.floor(Math.random() * 4);
        console.log(corrIdx);
        for (let i=0; i<4; ++i){
            if (i == corrIdx) continue;
            tmpWrongIdx = Math.floor(Math.random() * targetLen);
            while (wrongIdx.includes(tmpWrongIdx) || tmpWrongIdx == wordIdx){
                tmpWrongIdx = Math.floor(Math.random() * targetLen);
            }
            wrongIdx.push(tmpWrongIdx);
            ans[i].innerText = target[tmpWrongIdx]["meaning"];
        }
        wrongIdx = [];
        question.innerText = target[wordIdx]["word"];
        ans[corrIdx].innerText = target[wordIdx]["meaning"];
        cnt++;
        return [wordIdx, corrIdx]
    }
}

setQuiz();
corrCntElemA.innerText = 0;
wrongCntElemA.innerText = 0;
let [curWordIdx, curCorrIdx] = quiz();
let isClicked = [false, false, false, false];
ans[0].addEventListener("click", ()=>{
    if (curCorrIdx == 0){
        if (cnt==10){
            corrSound2.play();
        }else{
            corrSound.currentTime = 0;
            corrSound.play();
        }
        corrCnt++;
        corrCntElemA.innerText = corrCnt;
        [curWordIdx, curCorrIdx] = quiz();
        isClicked = [false, false, false, false];
    }else{
        wrongSound.currentTime = 0;
        wrongSound.play();
        if (isClicked[0]) return;
        wrongCnt++;
        wrongCntElemA.innerText = wrongCnt;
        isClicked[0] = true;
        wrongs.push([curWordIdx, ans[0].textContent]);
    }
})
ans[1].addEventListener("click", ()=>{
    if (curCorrIdx == 1){
        if (cnt==10){
            corrSound2.play();
        }else{
            corrSound.currentTime = 0;
            corrSound.play();
        }
        corrCnt++;
        corrCntElemA.innerText = corrCnt;
        [curWordIdx, curCorrIdx] = quiz();
        isClicked = [false, false, false, false];
    }else{
        wrongSound.currentTime = 0;
        wrongSound.play();
        if (isClicked[1]) return;
        wrongCnt++;
        wrongCntElemA.innerText = wrongCnt;
        isClicked[1] = true;
        wrongs.push([curWordIdx, ans[1].textContent]);
    }
})
ans[2].addEventListener("click", ()=>{
    if (curCorrIdx == 2){
        if (cnt==10){
            corrSound2.play();
        }else{
            corrSound.currentTime = 0;
            corrSound.play();
        }
        corrCnt++;
        corrCntElemA.innerText = corrCnt;
        [curWordIdx, curCorrIdx] = quiz();
        isClicked = [false, false, false, false];
    }else{
        wrongSound.currentTime = 0;
        wrongSound.play();
        if (isClicked[2]) return;
        wrongCnt++;
        wrongCntElemA.innerText = wrongCnt;
        isClicked[2] = true;
        wrongs.push([curWordIdx, ans[2].textContent]);
    }
})
ans[3].addEventListener("click", ()=>{
    if (curCorrIdx == 3){
        if (cnt==10){
            corrSound2.play();
        }else{
            corrSound.currentTime = 0;
            corrSound.play();
        }
        corrCnt++;
        corrCntElemA.innerText = corrCnt;
        [curWordIdx, curCorrIdx] = quiz();
        isClicked = [false, false, false, false];
    }else{
        wrongSound.currentTime = 0;
        wrongSound.play();
        if (isClicked[3]) return;
        wrongCnt++;
        wrongCntElemA.innerText = wrongCnt;
        isClicked[3] = true;
        wrongs.push([curWordIdx, ans[3].textContent]);
    }
})
replay.addEventListener("click", ()=>{
    if (cnt==0){
        [curWordIdx, curCorrIdx] = quiz();
        corrCnt = 0;
        wrongCnt = 0;
        wrongs = [];
        isClicked = [false, false, false, false];
        corrCntElemA.innerText = 0;
        wrongCntElemB.innerText= 0;
        body.style.animation = "";
        result.style.animation = "";
    }
})