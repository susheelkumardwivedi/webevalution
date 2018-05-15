const express = require('express')
const { Batch } = require('./db')
const { Student } = require('./db')
const { BatchStudent } = require('./db')
const route = require('express').Router()


const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route.get('/', (req, res) => {
     Student.findAll().
     then((students)=>{
         res.status(200).send(students)
     }).
     catch((err)=>{
         res.status(500).send('Cant find any students')
     })
    
    
})

route.post('/', (req, res) => {
    Student.create({
        name: req.body.name
    }).then(() => {
       res.status(200).send('Student added succesfully')
    }).catch((err) => res.send('cant add the student'))
})

route.delete('/', (req, res) => {
    Student.destroy({
        where: {},
        truncate: true
      }).then(() => {
       res.status(200).send('Students deleted succesfully')
    }).catch((err) => res.send('cant delete the Students'))
})


route.get('/:id', (req, res) => {
    Student.findOne({
        where:{id:parseInt(req.param.id)} 
    }).
    then((student)=>{
        res.status(200).send(student)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any student')
    })
   
   
})

route.put('/:id', (req, res) => {
    Student.findOne({
        where:{id:parseInt(req.param.id)} 
    }).
    then((student)=>{
        if(req.param.name!==undefined){
            student.updateAttributes({
               name:req.param.name
            })
        }
    }).
    catch((err)=>{
        res.status(500).send('Cant find any student')
    })
   
   
})

route.delete('/:id', (req, res) => {
    Student.destroy({
        where: {id:parseInt(req.param.id)},
        truncate: true
      }).then(() => {
       res.status(200).send('Student deleted succesfully')
    }).catch((err) => res.send('cant delete the student'))
})


route.get('/:id/batches', (req, res) => {
    BatchStudent.findAll({
        where:{studentId:parseInt(req.param.id)} 
    }).
    then((batches)=>{
        res.status(200).send(batches)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any batches')
    })
   
   
})

route.post('/:id/batches', (req, res) => {
    BatchStudent.create({
        name:req.param.name,
        studentId:parseInt(req.param.id),
        batchId:parseInt(req.param.batchId)
    }).
    then(()=>{
        res.status(200).send('batch added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the Batch due to '+err)
    })
 })

 route.delete('/:id/batches', (req, res) => {
    BatchStudent.destroy({
        where: {
            studentId:parseInt(req.param.id)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('batches deleted succesfully')
    }).catch((err) => res.send('cant delete the batches'))
})

module.exports=route