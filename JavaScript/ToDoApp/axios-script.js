let todos = [];
let isUpdateFormActive = true;
let indeks = 0;
showTrueForm();

function getToDoListAPI(){
    axios.get("http://localhost:5000/api/todos").then(res =>{
        
    })
}
getToDoListAPI();

function deleteToDoAPI(id){
    // fetch("http://localhost:5000/api/todos/"+id,{   
    // method:"DELETE"}).then(res => res.json()).catch.then(data => {
    //     console.log(data);
    //     todos.splice(id.id,1);
    //     getToDoListAPI();
    // });

    axios.get("http://localhost:5000/api/todos").then(res => {
        todos = res.data;
        SetUlList();
    })
}
function save(){
    const textInput = document.getElementById("work");
    const value = textInput.value;

    axios.post("http://localhost:5000/api/todos/create",{title:value}) .then(res=>{
        getToDoListAPI();
        textInput.value = "";
        textInput.focus();
    })

    todos.push(textInput.value);
    
    SetUlList();

    textInput.value = "";
    textInput.focus();
}

const deleteToDo = (index) => {
    todos.splice(index,1);
    SetUlList();
}

function SetUlList(){
    let text = "";
    for(let item in todos){
        const value = todos[item];
        text += `<li><span>${value.title}</span><div class="operations"><button onclick="get(${item})">Update</button><button onclick="deleteToDoAPI(${item})">Delete</button></div></li>`
    }
    const ulElement = document.getElementById("todo-list");
    //ulElement.innerHTML += `<li>${textInput.value}</li>`;
    ulElement.innerHTML = text;
}

function showTrueForm(){
    isUpdateFormActive = !isUpdateFormActive;
    const addFormElement = document.getElementById("addForm");
    const updateFormElement = document.getElementById("updateForm");
    const operationsElements = document.querySelectorAll(".operations")
    if(isUpdateFormActive)
    {
        addFormElement.style.display = "none";
        updateFormElement.style.display = "block";
        for(let element of operationsElements){
            element.style.display = "none";
        }
    }else{
        addFormElement.style.display = "block";
        updateFormElement.style.display = "none";
        for(let element of operationsElements){
            element.style.display = "inline-block";
        }
    }
}
const updateWorkElement = document.getElementById("updatework")
function get(index){
    showTrueForm();
    updateWorkElement.value = todos[index].title;
    indeks = index;
}

function update(){
    todos[indeks].title = updateWorkElement.value;
    showTrueForm();
    SetUlList();
}
function cancel(){
    showTrueForm();
}