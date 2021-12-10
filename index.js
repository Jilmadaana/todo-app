const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const todoModel = require('./models/todoModel');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.JSON());

app.get('/',(req, res)=>{
    res.send('we are in the root folder');

});

app.post('/todos/', async (req, res)=>{
    const todo = todoModel.create({
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        endDate: req.body.endDate
    });
    try{const createTodo = await todo.save();
        res.json({
            data:createTodo,
            message: "Todo successfully created",
            status: true
        })

    }catch(err){
        res.json({message:err
});

    }
   
});

app.patch('/todos/:todoId',async(req, res)=>{
    try{
        const updateTodo = await todoModel.findOneAndUpdate({_id:req.params.todoId},{set:{status:req.body.status}});
        res.json({
        data: updateTodo,
        message: 'Todo successfully updated'
        
        });
    
    }catch(err){

     res.json({message: err});   
    }

});

//delete a todo
app.delete('/todos/todoId', async(req,res)=>{
try{
    const deleteTodo = await todoModel.findOneAndDelete({_id:req.params.todoId});
    res.json({data:deleteTodo,
    message: 'Todo successfully deleted'});
}catch(err){
    res.json({message:err});
}
})

app.get('/todos/',async(req, res)=>{
try {
    const getOneTodo = await todoModel.findById({_id:req.parms.todoId});
  
    


}catch (err) {
    res.json({message:err});
}

    });

    app.get("/todo/:todoId",(req, res)=>{
        const getOneTodo = await todoModel.findById({_id:req.parms.todoId});
        res.json({data: getOneTodo,
            message:"Todos successfully retrieved"
        });
    })

mongoose.connect(process.env.DB_URL,()=>console.log('successfully connected'));
app.listen(process.env.PORT_NUMBER || 2021);


