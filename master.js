let data = [];
let isLoading = true;
async function fetchData (){
    const response = await fetch("https://dummyjson.com/todos")
    const {todos} = await response.json()

    data = todos;
}


fetchData().then(() => {
    isLoading = false;
    fillTable()
})

function fillTable(){
    let loader = document.querySelector(".loading");
    if(isLoading)
    null
else 
   { loader.style.display = "none";
     let tbody = document.querySelector("table tbody")
    data.forEach((obj)=>{
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
        deleteBtn.appendChild(document.createTextNode("Delete"))
        let doneBtn = document.createElement("button");
        doneBtn.id = "done"
        doneBtn.appendChild(document.createTextNode("Done"))
        let td = document.createElement("td");
        td.append(deleteBtn, doneBtn)
        tableRow.appendChild(td)
        tbody.appendChild(tableRow)
    })
    let count = document.querySelector("table tfoot span")
    count.innerHTML = data.length;}
}
