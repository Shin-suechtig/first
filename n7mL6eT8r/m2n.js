let o6l = document.getElementById("o6l");
let t10d = document.getElementById("t10d");
function t9e(){
    let s5dR4t = o6l.value.split(" ");
    let t10dT2t = s5dR4t.map(w2d=>{
        if (w2d == "")return "";
        let t1p = w2d.slice(0,1);
        let m4e = w2d.length -2;
        let b4m = w2d.slice(-1);
        return t1p+m4e+b4m
        });
    t10d.value = t10dT2t.join(" ");
}
o6l.oninput = t9e