const express = require('express')
const { Subject } = require('./db')
const { Teacher } = require('./db')
const route = require('express').Router()


const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route.get('/', (req, res) => {
     Subject.findAll().
     then((subjects)=>{
         res.status(200).send(subjects)
     }).
     catch((err)=>{
         res.status(500).send('Cant find any subjects')
     })
    
    
})

route.post('/', (req, res) => {
    Subject.create({
        name: req.body.name,
        batchId:parseInt(req.param.batchId)
    }).then(() => {
       res.status(200).send('Subject added succesfully')
    }).catch((err) => res.send('cant add the subject'))
})

route.delete('/', (req, res) => {
    Subject.destroy({
        where: {},
        truncate: true
      }).then(() => {
       res.status(200).send('Subjects deleted succesfully')
    }).catch((err) => res.send('cant delete the subject'))
})


route.get('/:id', (req, res) => {
    Subject.findOne({
        where:{id:parseInt(req.param.id)} 
    }).
    then((subjects)=>{
        res.status(200).send(subjects)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any subjects')
    })
   
   
})

route.put('/:id', (req, res) => {
    Subject.findOne({
        where:{id:parseInt(req.param.id)} 
    }).
    then((subject)=>{
        if(req.param.name!==undefined){
            subject.updateAttributes({
               name:req.param.name
            })
        }
    }).
    catch((err)=>{
        res.status(500).send('Cant update the subject')
    })
   
   
})

route.delete('/:id', (req, res) => {
    Subject.destroy({
        where: {id:parseInt(req.param.id)},
        truncate: true
      }).then(() => {
       res.status(200).send('Subject deleted succesfully')
    }).catch((err) => res.send('cant delete the subject'))
})


route.get('/:id/teachers', (req, res) => {
    Teacher.findAll({
        where:{id:parseInt(req.param.id)} 
    }).
    then((teachers)=>{
        res.status(200).send(teachers)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any teachers')
    })
   
   
})

route.post('/:id/teachers', (req, res) => {
    Teacher.create({
        name:req.param.name,
        subjectId:parseInt(req.param.id)
    }).
    then(()=>{
        res.status(200).send('Teacher added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the Teacher due to '+err)
    })
 })

 route.delete('/:id/teachers', (req, res) => {
    Batch.destroy({
        where: {
            subjectId:parseInt(req.param.id)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Teachers deleted succesfully')
    }).catch((err) => res.send('cant delete the teachers'))
})
module.exports=route