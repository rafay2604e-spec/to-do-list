
let tasks=JSON.parse(localStorage.getItem("tasks"))||[];

function save(){
 localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){
 let input=document.getElementById("taskInput");
 if(!input.value.trim())return;
 tasks.push({text:input.value.trim(),done:false});
 input.value="";
 save();showTasks();
}

function showTasks(){
 let search=document.getElementById("search").value.toLowerCase();
 document.getElementById("taskList").innerHTML="";
 tasks.forEach((task,i)=>{
 if(!task.text.toLowerCase().includes(search))return;
 let row=document.createElement("tr");
 row.innerHTML=`
 <td>${i+1}</td>
 <td><input type="checkbox" ${task.done?"checked":""}
 onchange="completeTask(${i})">
 <span style="${task.done?'text-decoration:line-through':''}"></span></td>
 <td><button onclick="editTask(${i})">Edit</button>
 <button onclick="deleteTask(${i})">X</button></td>`;
 row.querySelector("span").textContent=task.text;
 document.getElementById("taskList").appendChild(row);
 });
}

function editTask(i){
 let value=prompt("Edit Task",tasks[i].text);
 if(value&&value.trim()){
 tasks[i].text=value.trim();save();showTasks();
 }
}

function deleteTask(i){
 tasks.splice(i,1);save();showTasks();
}

function completeTask(i){
 tasks[i].done=!tasks[i].done;save();showTasks();
}

document.getElementById("taskInput").addEventListener("keydown",e=>{
 if(e.key==="Enter")addTask();
});

showTasks();
