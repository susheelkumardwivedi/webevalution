const express = require('express')
const { Batch } = require('./db')
const { Teacher } = require('./db')
const { BatchTeacher } = require('./db')
const route = require('express').Router()


const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route.get('/', (req, res) => {
     Teacher.findAll().
     then((teachers)=>{
         res.status(200).send(teachers)
     }).
     catch((err)=>{
         res.status(500).send('Cant find any teachers')
     })
    
    
})

route.post('/', (req, res) => {
    Teacher.create({
        name: req.body.name,
         subjectId:parseInt(req.param.subjectId)
    }).then(() => {
       res.status(200).send('teacher added succesfully')
    }).catch((err) => res.send('cant add the teacher'))
})

route.delete('/', (req, res) => {
    Teacher.destroy({
        where: {},
        truncate: true
      }).then(() => {
       res.status(200).send('teachers deleted succesfully')
    }).catch((err) => res.send('cant delete the teachers'))
})


route.get('/:id', (req, res) => {
    Teacher.findOne({
        where:{id:parseInt(req.param.id)} 
    }).
    then((teacher)=>{
        res.status(200).send(teacher)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any teacher')
    })
   
   
})

route.put('/:id', (req, res) => {
    Teacher.findOne({
        where:{id:parseInt(req.param.id)} 
    }).
    then((teacher)=>{
        if(req.param.name!==undefined){
            teacher.updateAttributes({
               name:req.param.name
            })
        }
    }).
    catch((err)=>{
        res.status(500).send('Cant find any teacher')
    })
   
   
})

route.delete('/:id', (req, res) => {
    Teacher.destroy({
        where: {id:parseInt(req.param.id)},
        truncate: true
      }).then(() => {
       res.status(200).send('teacher deleted succesfully')
    }).catch((err) => res.send('cant delete the teacher'))
})


route.get('/:id/batches', (req, res) => {
    BatchTeacher.findAll({
        where:{teacherId:parseInt(req.param.id)} 
    }).
    then((batches)=>{
        res.status(200).send(batches)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any batches')
    })
   
   
})

route.post('/:id/batches', (req, res) => {
    BatchTeacher.create({
        name:req.param.name,
        teacherId:parseInt(req.param.id),
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
    BatchTeacher.destroy({
        where: {
            teacherId:parseInt(req.param.id)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('batches deleted succesfully')
    }).catch((err) => res.send('cant delete the batches'))
})

module.exports=route