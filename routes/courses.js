//Course model
const express = require('express')
const { Course } = require('./db')
const { Batch } = require('./db')
const { Lecture } = require('./db')
const { Student } = require('./db')
const { Teacher } = require('./db')
const Sequelize = require('sequelize')
const route = require('express').Router()




const app=express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

route.get('/', (req, res) => {
     Course.findAll().
     then((courses)=>{
         res.status(200).send(courses)
     }).
     catch((err)=>{
         res.status(500).send('Cant find any course')
     })
    
    
})

route.post('/', (req, res) => {
    Course.create({
        name: req.body.name
    }).then(() => {
       res.status(200).send('Course added succesfully')
    }).catch((err) => res.send('cant add the course'))
})

route.delete('/', (req, res) => {
    Course.destroy({
        where: {},
        truncate: true
      }).then(() => {
       res.status(200).send('Courses deleted succesfully')
    }).catch((err) => res.send('cant delete the course'))
})




route.get('/:id', (req, res) => {
    Course.findOne({
        where: {id: parseInt(req.param.id)}
      }).then((course)=>{
            res.status(200).send(course)
      }).
      catch((err)=>{
          res.status(500).send('course with id:'+req.param.id+' is not there')

      })
      
    
})

route.put('/:id', (req, res) => {
    Course.findOne({
        where: {id: parseInt(req.param.id)}
      }).then((course)=>{
        if(req.param.name!==undefined){
            course.updateAttributes({
               name:req.param.name
            })
        }
      }).
      catch((err)=>{
          res.status(500).send('course with id:'+req.param.id+' is not there')

      })
      
    
})



route.delete('/:id', (req, res) => {
    Course.destroy({
        where: {
            id:parseInt(req.param.id)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Course deleted succesfully')
    }).catch((err) => res.send('cant delete the course'))
})



route.get('/:id/batches', (req, res) => {
    Batch.findAll({
        where:{
            courseId:parseInt(req.param.id)
        }
    }).
    then((batches)=>{
        res.status(200).send(courses)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course due to '+err)
    })
   
   
})


route.post('/:id/batches', (req, res) => {
    Batch.create({
        name:req.param.name,
        courseId:parseInt(req.param.courseId)
    }).
    then(()=>{
        res.status(200).send('Batch added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the batch due to '+err)
    })
 })

 route.delete('/:id/batches', (req, res) => {
    Batch.destroy({
        where: {
            courseId:parseInt(req.param.courseId)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Batches deleted succesfully')
    }).catch((err) => res.send('cant delete the batch'))
})
 
route.get('/:id/batches/:batchId', (req, res) => {
    Batch.findOne({
        where:{
           
               courseId:parseInt(req.param.id),
               id:parseInt(req.param.batchId)
            
        }
    }).
    then((batch)=>{
        res.status(200).send(batch)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.put('/:id/batches/:batchId', (req, res) => {
    Batch.findOne({
        where:{
           
               courseId:parseInt(req.param.id),
               id:parseInt(req.param.batchId)
            
        }
    }).
    then((batch)=>{
        if(req.param.name!==undefined){
            batch.updateAttributes({
               name:req.param.name
            })
        }
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.delete('/:id/batches/:batchId', (req, res) => {
    Batch.destroy({
        where: {
            courseId:parseInt(req.param.id),
            id:parseInt(req.param.batchId)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Batches deleted succesfully')
    }).catch((err) => res.send('cant delete the batch'))
})

route.get('/:id/batches/:batchId/lectures', (req, res) => {
    Lecture.findAll({
        where:{
            courseId:parseInt(req.param.id),
            batchId:parseInt(req.param.batchId)
        }
    }).
    then((lectures)=>{
        res.status(200).send(lectures)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.post('/:id/batches/:batchId/lectures/', (req, res) => {
    Lecture.create({
        name:req.param.name,
        courseId:parseInt(req.param.id),
        batchId:parseInt(req.param.batchId)
    }).
    then(()=>{
        res.status(200).send('Lecture added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the lecture due to '+err)
    })
 })

 route.delete('/:id/batches/:batchId/lectures/', (req, res) => {
    Lecture.destroy({
        where: {
            courseId:parseInt(req.param.id),
            batchId:parseInt(req.param.batchId)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Lectures deleted succesfully')
    }).catch((err) => res.send('cant delete the lecture'))
})
 

route.get('/:id/batches/:batchId/lectures/:lectureId', (req, res) => {
    Lecture.findOne({
        where:{
           
               courseId:parseInt(req.param.id),
               batchId:parseInt(req.param.batchId),
               id:parseInt(req.param.lectureId)

            
        }
    }).
    then((lecture)=>{
        res.status(200).send(lecture)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.put('/:id/batches/:batchId/lectures/:lectureId', (req, res) => {
    Lecture.findOne({
        where:{
           
               courseId:parseInt(req.param.id),
               batchId:parseInt(req.param.batchId),
               id:parseInt(req.param.lectureId)

            
        }
    }).
    then((lecture)=>{
        if(req.param.name!==undefined){
        lecture.updateAttributes({
           name:req.param.name
        })
    }
    if(req.param.batchId!==undefined){
        lecture.updateAttributes({
           batchId:req.param.batchId
        })
    }
    if(req.param.courseId!==undefined){
        lecture.updateAttributes({
           courseId:req.param.courseId
        })
    }
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.delete('/:id/batches/:batchId/lectures/:lectureId', (req, res) => {
    Lecture.destroy({
        where: {
            courseId:parseInt(req.param.id),
            batchId:parseInt(req.param.batchId),
            id:parseInt(req.param.lectureId)
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Lecture deleted succesfully')
    }).catch((err) => res.send('cant delete the lecture'))
})


route.get('/:id/batches/:batchId/students', (req, res) => {
    BatchStudent.findAll({
        where:{
            courseId:parseInt(req.param.id),
            batchId:parseInt(req.param.batchId)
        },
        include:[Student]
    }).
    then((students)=>{
        res.status(200).send(students)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any course')
    })
   
   
})

route.post('/:id/batches/:batchId/students', (req, res) => {
    Student.create({
        name:req.param.name,
        courseId:parseInt(req.param.id),
        batchId:parseInt(req.param.batchId)
    }).
    then(()=>{
        res.status(200).send('Student added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the student due to '+err)
    })
 })

 route.delete('/:id/batches/:batchId/students', (req, res) => {
    BatchStudent.destroy({
        where: {
            courseId:parseInt(req.param.id),
            batchId:parseInt(req.param.batchId)
           
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Students deleted succesfully')
    }).catch((err) => res.send('cant delete the student'))
})


route.get('/:id/batches/:batchId/teachers', (req, res) => {
    Teacher.findAll({
        where:{
            courseId:parseInt(req.param.id),
            batchId:parseInt(req.param.batchId)
        },
        include:[Teacher]
    }).
    then((teachers)=>{
        res.status(200).send(teachers)
    }).
    catch((err)=>{
        res.status(500).send('Cant find any Teacher')
    })
   
   
})

route.post('/:id/batches/:batchId/teachers', (req, res) => {
    Teacher.create({
        name:req.param.name,
        courseId:parseInt(req.param.id),
        batchId:parseInt(req.param.batchId)
    }).
    then(()=>{
        res.status(200).send('Teacher added succesfully')
    }).
    catch((err)=>{
        res.status(500).send('Cant add the teacher due to '+err)
    })
 })

 route.delete('/:id/batches/:batchId/teachers', (req, res) => {
    BatchTeacher.destroy({
        where: {
            courseId:parseInt(req.param.id),
            batchId:parseInt(req.param.batchId)
           
        },
        truncate: true
      }).then(() => {
       res.status(200).send('Teachers deleted succesfully')
    }).catch((err) => res.send('cant delete the teacher'))
})

//exporting this model
module.exports=route
