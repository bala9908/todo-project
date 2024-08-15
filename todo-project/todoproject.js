

let unorder=document.getElementById("unoderdlist");

let addtaskbutton=document.getElementById("addtask");
let savebutton=document.getElementById("savebutton");


function getfromstorae(){
let a=localStorage.getItem("todovalue");
let b=JSON.parse(a);
if(b===null){
    return[];
}
else{
    return b;
}
}

let todolist=getfromstorae(); 
//let todolist=[
//{
//    text:"html",
   // value:1
//},
//{
  //  text:"css",
    //value:2
//},
//{
  //  text:"javascript",
  //  value:3
// }

//];

savebutton.onclick=function(){ //store the value
localStorage.setItem("todovalue",JSON.stringify(todolist));
}


let todocount=todolist.length


addtaskbutton.onclick=function(){  //this function add new tasks
let input=document.getElementById("text");
let uservalue=input.value;
if(uservalue ===""){
    alert("Please Enter a valid input");
    return; // this return is used to out of the function if there is no value in inputelement
}
todocount=todocount+1
let newtodo={
    text:uservalue,
    value:todocount,
    ischecked:false
}
todolist.push(newtodo); //newtodo is  added to the exist newtodo
crateandappend(newtodo); // 
input.value="";
}

function checkboxchange(checkboxid,labelid,listid){
let checkboxvalue=document.getElementById(checkboxid);
let labelclass=document.getElementById(labelid);
if(checkboxvalue.checked === true){
    labelclass.classList.add("line");
}
else{
    labelclass.classList.remove("line");
}

let todoindex=todolist.findIndex(function(v){
    let g="list"+v.value;
    if(g===listid){
        return true;
    }
    else{
        return false;
    }
});
let findid=todolist[todoindex];
if(findid.ischecked===true){
    findid.ischecked=false
}
else{
    findid.ischecked=true;
}
}



function deletevalue(listid){
let listvalue=document.getElementById(listid);
unorder.removeChild(listvalue);

let todoobject=todolist.findIndex(function(eachtodo){
    let i="list"+todolist.value;
    if(listid===i){
        return true;
    }
    else{
        return false;
    }

})
 todolist.splice(todoobject,1);
}


function crateandappend(todolist){
let checkboxid="check"+todolist.value;
let deleteid="delete"+todolist.value;
let listid="list"+todolist.value;
let labelid="label"+todolist.value;

let list=document.createElement("li");
unorder.appendChild(list);
list.classList.add("d-flex","flex-row");
list.id=listid;

let checkbox=document.createElement("input");
checkbox.type="checkbox";
list.appendChild(checkbox);
checkbox.id=checkboxid;
checkbox.onclick=function(){
checkboxchange(checkboxid,labelid,listid);
}
checkbox.checked=todolist.ischecked;
checkbox.classList.add("checkbox");

let labelcontainer=document.createElement("div");
list.appendChild(labelcontainer);
labelcontainer.classList.add("labelcontainer");


let labelelement=document.createElement("label");
labelcontainer.appendChild(labelelement);
labelelement.textContent=todolist.text;
if(todolist.ischecked===true){
labelelement.classList.add("line");
}
labelelement.id=labelid;
labelelement.setAttribute("for",checkboxid);

let deletecontainer=document.createElement("div");
list.appendChild(deletecontainer);
deletecontainer.classList.add("deletecontainer","d-flex","flex-row");

let deleteicon=document.createElement("i");
list.appendChild(deleteicon);
deleteicon.id=deleteid;
deleteicon.onclick=function(){
deletevalue(listid);
}
deleteicon.classList.add("fa-solid","fa-trash","deleteicon");

}




for(let i of todolist){
crateandappend(i);
}
