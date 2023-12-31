//Modules
    const express = require('express');
    const app = express();
    const {engine} = require('express-handlebars');
    const path = require('path');
    const mongoose = require('mongoose');
    mongoose.Promise = global.Promise;
//calling the tasks Model
    require('./models/tasks');
    const Task = mongoose.model('task');
//connecting to mongo
    async function connectoMongo(){
        try {
            await mongoose.connect('mongodb://localhost/to-do');
            console.log('Connected!');
        } catch (error) {
            console.log('Error ' + error);
        }
    }
    connectoMongo();
//body-Parser
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
//Handlebars
    app.engine('handlebars', engine({
        defaultLayout: 'main',
        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        }
    }));
    app.set('view engine', 'handlebars');
//Static Files
    app.use(express.static('public'));
//Routes
    app.get('/', async (req, res)=>{
        try {
            const tasks = await Task.find().sort({data: 'ascending'});
            res.render('index', {tasks : tasks});
        } catch (error) {
            
        }
        
    });
    app.post('/save', async (req, res)=>{
        try {
            const newTask = {Task : req.body.task};
            await new Task(newTask).save();
            res.redirect('/');
        } catch (error) {
            res.send('Ocorreu um erro por favor tente novamente.');
        }
    });
    app.post('/delete', async (req, res)=>{
        try {
            await Task.findByIdAndDelete({_id: req.body.id});
            res.redirect('/');
        } catch (error) {   
            res.send('Ocorreu um erro interno');
        }
    });
    app.get('/editar/:id', async (req, res)=>{
        try {
            const task = await Task.findById({_id: req.params.id});
            res.render('edit', {task : task});
        } catch (error) {
            res.send('Ocorreu um erro');
        }
    });
    app.post('/save-edit', async (req, res)=>{
        
        const upadatedTask = req.body.task;
        const id = req.body._id;

        try {
            await Task.findByIdAndUpdate(id, {Task : upadatedTask});
            res.redirect('/');
        } catch (error) {
            res.send('Ocorreu um Erro' + error);
        } 
    });
//Port configuration
    app.set('port', process.env.PORT || 8081);
    app.listen(app.get('port'), ()=> console.log(`Server running on port ${app.get('port')}, press Ctrl + C to stop.`));

