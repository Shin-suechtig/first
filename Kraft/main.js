const WHOLE = whole();
let target = [];
for (const i of WHOLE){
    for (const j of i){
        for (const k of j){
            target.push({"word":k["word"], "meaning":k["meaning"], "gender":k["gender"]})
        }
    }
}
let targetLen = target.length;
let display = document.getElementById("display");
let question = document.getElementById("question");
let ans = [document.getElementById("ans0"), document.getElementById("ans1"), document.getElementById("ans2"), document.getElementById("ans3")]
let result = document.getElementById("result");
let replay = document.getElementById("replay");

let wordIdx;
let tmpWordIdx;
let corrIdx;
let wrongIdx = [];
let tmpWrongIdx;
let cnt = 0;
let wrongs = [];
let wrongsLen;
let mistakenWordIdx;
let wrongsTxt;
function setQuiz(){
    display.style.display = "table";
    question.style.display = "table-cell";
    ans[0].style.display = "table-cell";
    ans[1].style.display = "table-cell";
    ans[2].style.display = "table-cell";
    ans[3].style.display = "table-cell";
    replay.style.display = "none";
    result.style.display = "none";
}
function removeQuiz(){
    display.style.display = "none";
    question.style.display = "none";
    ans[0].style.display = "none";
    ans[1].style.display = "none";
    ans[2].style.display = "none";
    ans[3].style.display = "none";
    replay.style.display = "block";
    result.style.display = "block";
}
function quiz(){
    if (cnt == 20){
        removeQuiz();
        question.innerText = "";
        for (let i=0; i<4; ++i){
            ans[i].innerText = "";
        }
        cnt = 0;
        replay.innerText = "Replay";
        wrongsLen = wrongs.length;
        if (wrongsLen == 0){
            result.innerText = "Perfect!";
            return [null, null];
        }
        wrongsTxt = "";
        for (let i=0; i<wrongsLen; ++i){
            mistakenWordIdx = wrongs[i][0];
            wrongsTxt += "'" + target[mistakenWordIdx]["word"] + "'" + " is not " + "'"
                + wrongs[i][1] + "', it's " + target[mistakenWordIdx]["meaning"] + "\n";
        }
        result.innerText = wrongsTxt;
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

let [curWordIdx, curCorrIdx] = quiz();
setQuiz();
let isClicked = [false, false, false, false];
ans[0].addEventListener("click", ()=>{
    if (curCorrIdx == 0){
        [curWordIdx, curCorrIdx] = quiz();
        isClicked = [false, false, false, false];
    }else{
        if (isClicked[0]) return;
        isClicked[0] = true;
        wrongs.push([curWordIdx, ans[0].textContent]);
    }
})
ans[1].addEventListener("click", ()=>{
    if (curCorrIdx == 1){
        [curWordIdx, curCorrIdx] = quiz();
        isClicked = [false, false, false, false];
    }else{
        if (isClicked[1]) return;
        isClicked[1] = true;
        wrongs.push([curWordIdx, ans[1].textContent]);
    }
})
ans[2].addEventListener("click", ()=>{
    if (curCorrIdx == 2){
        [curWordIdx, curCorrIdx] = quiz();
        isClicked = [false, false, false, false];
    }else{
        if (isClicked[2]) return;
        isClicked[2] = true;
        wrongs.push([curWordIdx, ans[2].textContent]);
    }
})
ans[3].addEventListener("click", ()=>{
    if (curCorrIdx == 3){
        [curWordIdx, curCorrIdx] = quiz();
        isClicked = [false, false, false, false];
    }else{
        if (isClicked[3]) return;
        isClicked[3] = true;
        wrongs.push([curWordIdx, ans[3].textContent]);
    }
})
replay.addEventListener("click", ()=>{
    if (cnt==0){
        result.innerText = "";
        replay.innerText = "";
        [curWordIdx, curCorrIdx] = quiz();
        wrongs = [];
        isClicked = [false, false, false, false];
    }
})