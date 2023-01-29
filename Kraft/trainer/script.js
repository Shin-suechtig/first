console.log("What never function now are:");
console.log("- Display interval setting");
console.log("- Word class changing");
console.log("If you want to use them, you can reset the variables 'wordClass', 'wordIntvVal' and 'ansIntvVal' at 'script.js'.")
console.log("And I beg your committing.");
console.log("----");
let wordClass = "noun";
let target = words(wordClass);
let targetLen = target.length;
console.log(targetLen);
let clsChg = document.getElementById("clsChg");
let word = document.getElementById("word");
let pronunc = document.getElementById("pronunc");
let answer = document.getElementById("answer");
let wordIntv = document.getElementById("wordIntv");
let ansIntv = document.getElementById("ansIntv");
let wordIntvVal = 2000;
let ansIntvVal = 1000;
let rndNum = Math.floor(Math.random() * targetLen);
function show(){
    word.innerText = "";
    pronunc.innerText = "";
    answer.innerText = "";
    word.innerText = target[rndNum]["word"];
    pronunc.innerText = "[" + target[rndNum]["pronunc"] + "]";
    setTimeout(()=>{
        answer.innerText = target[rndNum]["meaning"];
        tmp = Math.floor(Math.random() * targetLen);
        while (tmp == rndNum){
            tmp = Math.floor(Math.random() * targetLen);
        }
        rndNum = tmp;
    }, ansIntvVal);
}

let id = setInterval(show, 2000);

wordIntv.addEventListener("input", () => {
    clearInterval(id);
    wordIntvVal = wordIntv.value;
    if (wordIntvVal == 0){
        id = setInterval(show, 1);
    }else{
        id = setInterval(show, wordIntvVal + ansIntvVal);
    }
});
ansIntv.addEventListener("input", () => {
    clearInterval(id);
    ansIntvVal = ansIntv.value;
    if (ansIntvVal == 0){
        id = setInterval(show, 1);
    }else{
        id = setInterval(show, wordIntvVal + ansIntvVal);
    }
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
    console.log(targetLen);
    id = setInterval(show, 2000);
})