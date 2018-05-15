//main server

const express = require('express')
const path = require('path')
const app = express()
var port=process.env.PORT || 3000
app.use('/', express.static(path.join(__dirname, 'public')))

//define middleware of application
const routes = {
    courses : require('./routes/courses'),
    subjects : require('./routes/subjects'),
    teachers : require('./routes/teachers'),
    students : require('./routes/students')
    
}


//use middle ware
app.use('/courses', routes.courses)
app.use('/subjects', routes.subjects)
app.use('/teachers', routes.teachers)
app.use('/students', routes.students)

app.listen(port,"127.0.0.1")  //localhost