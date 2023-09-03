//express.js => API isteklerini yazabilmemizi sağlayan js kütüphanesi
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


const todos = [];
let id = 0;



app.get("/api/hello",(req,res) => {
    res.json({message : "API call is successful"})
});

// app.get("/api/todos/create/:value",(req,res) => {
//     const value = req.params.value;

//     id++;
//     const data = {
//         id:id,
//         title:value,
//         completed:false,
//         date: new Date()
//     }
//     todos.push(data);
//     res.json({message: "Create is successful"})
// });

app.post("/api/todos/create",(req,res)=>{
    const body = req.body;
    id++;
    const data = {
        id:id,
        title:body.title,
        isCompleted:false,
        date:new Date()
    };
    todos.push(data);
    res.json({message:"Create is successfull"});
})

app.get("/api/todos",(req,res) => {
    res.json(todos);
});
app.get("/api/todos/remove/:id",(req,res)=>{
    const id = req.params.id;

    const index = todos.findIndex(p => p.id == id);
    if(index === -1)
    {
        res.status(500).json({message:"The record you want to delete was not found!"});
    }else{
        todos.splice(index,1);
        res.json({message: "Remove is successfull"});
    }
})
app.listen(5000, () => console.log("WebAPI Application is running..."));