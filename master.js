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


fetchData().then(() => {
    isLoading = false;
    fillTable(data)
})

function fillTable(givenData){
    let loader = document.querySelector(".loading");
    if(isLoading)
    null
else 
   {
    let filterdData = givenData.filter((obj)=>{
    return obj.todo.toLowerCase().includes(query)
    }) 
    loader.style.display = "none";
     let tbody = document.querySelector("table tbody")
     
     filterdData.forEach((obj)=>{
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
    })
    let count = document.querySelector(".count span")
    count.innerHTML = filterdData.length;}
}

//**************************************************
function clearTable(){
    let tbody = document.querySelector("table tbody")
    tbody.innerHTML = ""
}
function done(){
    document.addEventListener("click",(e)=>{
        if(e.target.id == "done"){
            let rowId = e.target.parentElement.dataset.id;
            data.forEach((obj)=>{
                if (obj.id == rowId){
                    obj.completed ? obj.completed = false : obj.completed = true;
                    e.target.parentElement.parentElement.classList.toggle("completedTak")
                }
            })
            window.localStorage.setItem("list",JSON.stringify(data))
            clearTable();
            fillTable(data)
        }
    })
}
done()

function deleteTask(){
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
                    data.forEach((obj)=>{
                        if (obj.id == rowId){
                            let indexToRemove = data.indexOf(obj)
                            data.splice(indexToRemove,1)
                        }
                    })
                    window.localStorage.setItem("list",JSON.stringify(data))
                    clearTable();
                    fillTable(data)
                }
              })
        }
    })
}
deleteTask()
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
    window.localStorage.setItem("list",JSON.stringify(data))
    clearTable();
    document.querySelector("form input:not(:last-child)").value = ""
    fillTable(data)
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
 document.querySelector("input:first-child:last-child").oninput = ()=>{
    query = (document.querySelector("input:first-child:last-child").value).toLowerCase();
    clearTable();
    fillTable(data)
 }