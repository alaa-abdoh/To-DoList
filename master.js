let data = [];
let query = (document.querySelector("input:first-child:last-child").value).toLowerCase()
let isLoading = true;

async function fetchData (){
    const response = await fetch("https://dummyjson.com/todos")
    const {todos} = await response.json()
    data = todos;
    if(window.localStorage.getItem("list"))
        data = JSON.parse(window.localStorage.getItem("list"));
}


window.onload = ()=>{
    fetchData().then(() => {
        isLoading = false;
        fillTable(data)
    })
}

function fillTable(givenData){
    let loader = document.querySelector(".loading");
    if(!isLoading){
        let filterdData = givenData.filter((obj)=>{
        return obj.todo.toLowerCase().includes(query)
        }) 
        loader.style.display = "none";
            
            filterdData.forEach((obj)=>{
                createRowClone(obj)
        })
        let count = document.querySelector(".count span")
        count.innerHTML = filterdData.length;
    }
    
}
function createRowClone(obj){
    let tbody = document.querySelector("table tbody")
    let template = document.querySelector("#tableRow");
    const clone = template.content.cloneNode(true);
    let tds = clone.querySelectorAll("td");
    let tr = clone.querySelector("tr");
    tds[0].textContent = obj.id;
    tds[1].textContent = obj.todo;
    tds[1].setAttribute("title", obj.todo)
    tds[2].textContent = obj.userId;
    tds[4].dataset.id = obj.id;
    if (obj.completed) {
        tr.classList.add("completedTask");
        tds[3].textContent = "completed";
    } else {
        tds[3].textContent = "pending";
    }     
    tbody.appendChild(tr)
}
//**************************************************
document.addEventListener("click", (e) => {
    if (e.target.id === "done") {
        const rowId = e.target.parentElement.dataset.id;
        done(rowId); 
    }
});
function clearTable(){
    let tbody = document.querySelector("table tbody")
    tbody.innerHTML = ""
}
function done(todoId) {
    const todoItemIndex = data.findIndex((obj) => obj.id == todoId);
    data[todoItemIndex].completed = !data[todoItemIndex].completed;

    const row = document.querySelector(`[data-id="${todoId}"]`).parentElement;
    row.classList.toggle("completedTask");
    let statusTd = row.querySelector("td:nth-child(4)")
    if(data[todoItemIndex].completed) statusTd.innerHTML="completed"
    else statusTd.innerHTML="pending"
    window.localStorage.setItem("list", JSON.stringify(data));    
}
document.addEventListener("click",(e)=>{
        if(e.target.id == "delete"){
            Swal.fire({
                title: 'Cation!',
                text: 'Are you sure you want continue delete this todo ?',
                icon: 'warning',
                footer: "Note: you cant undo this operation",
                showDenyButton:true,
                denyButtonText:"No",
                confirmButtonText:"yes sure"
              }).then((prom)=>{
                if(prom.isConfirmed == true){
                    let rowId = e.target.parentElement.dataset.id;
                    deleteTask(rowId)
                }
              })
        }
    })
function deleteTask(todoId){
    let index = data.findIndex((obj)=> obj.id == todoId);
    data.splice(index, 1);
    const row = document.querySelector(`[data-id="${todoId}"]`).parentElement;
    row.remove()
    window.localStorage.setItem("list",JSON.stringify(data))
}
// add task
document.forms[0].onsubmit = (e)=>{
    e.preventDefault();
   let inputField = document.querySelector("form input:not(:last-child)").value;
   if(inputField !== "" && ! inputField.startsWith(" ")){
    let newID = data[data.length - 1].id + 1;
    let obj ={
        id : newID,
        todo : inputField,
        completed : false,
        userId : Math.floor((Math.random() *50) + 1) 
    }
    data.push(obj)
    createRowClone(obj)
    window.localStorage.setItem("list",JSON.stringify(data))
    document.querySelector("form input:not(:last-child)").value = ""
   }
   else {
    Swal.fire({
        title: 'Warning!',
        text: 'You cant add empty task',
        icon: 'warning',
        showDenyButton:false,
        confirmButtonText:"OK"
      })
   }
}
function filter(){
    query = (document.querySelector("input:first-child:last-child").value).toLowerCase();
    clearTable();
    fillTable(data)
 }