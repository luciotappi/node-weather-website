//core modules 
const path = require ('path')
//npm modules
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')

//local files
const geoCode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=> {
    res.render('index',{
        title:'Weather',
        name:'Lucio Tappi'
    })
})

app.get('/about',(req,res)=> {
    res.render('about',{
        title:'About',
        name:'Lucio Tappi'
    })
})

app.get('/help',(req,res)=> {
    res.render('help',{
        title:'Help',
        helpText:'This is some helpful text',
        name:'Lucio Tappi'
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            error: ' You must provide an address'
        })
    }
    geoCode(req.query.address, (error,{latitude,longitude,name}= {}) => {
        if (error) {
             return res.send(error)
        } 
            
        forecast(latitude, longitude, (error,data) => {
                if (error) {
                    return res.send(error)
                }
                console.log("Location: ",name)
                console.log("Temperature: "+ data.temperature + " degF")
                res.send({
                    location:name,
                    forecast:data.temperature,
                    address:req.query.address
                })
                })
         
    })
    
    
        
})

app.get('/products',(req,res)=>{
    // solo se puede enviar una sola respuesta por cada GET.
    // ERROR: Cannot set headers after the are sent to the client
    // es un error que salta cuando se envian dos res diferentes.
    // en linea 59 con poner return res.send se evita esto .
    if (!req.query.search) {
         res.send({
            error:'You must provide a search term'
        })
    }
    
    else {
        console.log(req.query)
        res.send({
            products: ""
        })
    }
        
    
    
})

app.get('/help/*',(req,res)=>{
   res.render('error',{
    errorMsg:'Help article not found',
    title:'404',
    name:'Lucio Tappi'
   })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMsg:'Page not found',
        title:'404',
        name:'Lucio Tappi'
       })
})

app.listen(3000, ()=> {
    console.log("App listening on port 3000")
})