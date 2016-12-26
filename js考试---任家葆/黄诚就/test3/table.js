/**
 * Created by gunjoe on 2016/12/16.
 */
var table = getId("table");
var rows = getClass("row");
var inputs = getTagName(table,"input");
var reserve = getId("reverseCheck");
var all = getId("allCheck");

for (var i = 1; i < rows.length; i++){
    rows[i].index = i;
}

table.addEventListener("click",function (e) {
    var idx = e.target.parentElement.index;
    var inp = rows[idx].children[0].children[0];
    if (inp.checked){
        inp.checked = "";
        rows[idx].style.backgroundColor = "";
    }else {
        inp.checked = "true";
        rows[idx].style.backgroundColor = "#FFB52A";
    }
},false);

all.addEventListener("click",function () {
    if (all.checked){
        for (var i = 1; i < inputs.length; i++){
            inputs[i].checked = "true";
            rows[i].style.backgroundColor = "#FFB52A";
        }
    }else {
        for (var j = 1; j < inputs.length; j++){
            inputs[j].checked = "";
            rows[j].style.backgroundColor = "";
        }
    }
},false);

reserve.addEventListener("click",function () {
    for (var i = 1; i < inputs.length; i++){
        inputs[i].checked = inputs[i].checked ? "" : "true";
        rows[i].style.backgroundColor = inputs[i].checked ? "#FFB52A" : "";
    }
},false);