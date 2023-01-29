const m3s = [
    " ", " "," "," "," "," "," "," "," "," ","\n",",",".",";",":","!","?",
    "\"","'","`","(",")","[","]","{","}","<",">","-","_","~","=","/","|","\\",
    "#","$","%","&","@","+","*","^"
];
const o6l = document.getElementById("o6l");
let t10d = document.getElementById("t10d");
function t9e(){
    // originalSplitByOneCharacter
    let o25r = o6l.value.split("");
    // translatedSplitByMarks
    let t20s = [];
    for (let i=0; i<o25r.length; ++i){
        let char = o25r[i];
        if (m3s.includes(char)){
            t20s.push(char)
        }else{
            if (m3s.includes(o25r[i-1]) || o25r[i-1] == null){
                t20s.push(char)
            }else{
                t20s[t20s.length-1]+=char
            }
        }
    }
    let t12t = t20s.map(
        text=>{
            if (m3s.includes(text)){
                return text;
            }else if (text == "WikiWiki"){
                return "W2iW2i";
            }else{
                return text.slice(0,1)+(text.length-2)+text.slice(-1);
            }
        }
    )
    t10d.value = t12t.join("");
}
o6l.oninput = t9e