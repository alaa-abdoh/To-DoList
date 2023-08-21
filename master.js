let data = [];
let isLoading = true;
async function fetchData (){
    const response = await fetch("https://dummyjson.com/todos")
    const {todos} = await response.json()

    data = todos;
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
   { loader.style.display = "none";
     let tbody = document.querySelector("table tbody")
     givenData.forEach((obj)=>{
        // console.log(obj)
        let id = obj.id;
        let description = obj.todo;
        let userID = obj.userId;
        let status = obj.completed ? "comleted" : "pending"
        let tableRow = document.createElement("tr")
        let arr = [id, description, userID, status];
        for(let i=0; i<4; i++){
            let td = document.createElement("td");
            let text = document.createTextNode(arr[i])
            td.appendChild(text);
            tableRow.appendChild(td)
        }
        let deleteBtn = document.createElement("button");
        deleteBtn.id = "delete"
        deleteBtn.dataset.id = obj.id;
        deleteBtn.appendChild(document.createTextNode("Delete"))
        let doneBtn = document.createElement("button");
        doneBtn.id = "done"
        doneBtn.dataset.id = obj.id;
        doneBtn.appendChild(document.createTextNode("Done"))
        let td = document.createElement("td");
        td.append(deleteBtn, doneBtn)
        tableRow.appendChild(td)
        obj.completed ? tableRow.style.background = "#cccccc3d": null
        tbody.appendChild(tableRow)
    })
    let count = document.querySelector("table tfoot span")
    count.innerHTML = givenData.length;}
}

//**************************************************
function clearTable(){
    let tbody = document.querySelector("table tbody")
    tbody.innerHTML = ""
}
function done(){
    document.addEventListener("click",(e)=>{
        if(e.target.id == "done"){
            let rowId = e.target.dataset.id;
            data.forEach((obj)=>{
                if (obj.id == rowId){
                    obj.completed ? obj.completed = false : obj.completed = true
                }
            })
            clearTable();
            fillTable(data)
        }
    })
}
done()
