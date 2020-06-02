const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geoCode=require('./utils/geoCodeAccess')
const foreCast=require('./utils/forcast')


const app=express()
const port =process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialPath)

//Setup static directory to Serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        Title:'Weather App',
        Desp: 'Know your weather',
        name:'Aman Singh'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        Title: 'Graduate Engineer Trainee',
        name:'Andrew'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        Title:'HELP',
        name:'Aman Singh'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Plz provide Address'
        })
    }
    geoCode(req.query.address,(error,{location,lat,long}={})=>{
        if(error)
        {
            res.send({
                error
            })
        }
        else{
            foreCast(lat,long,(error,data)=>{
                if(error)
                {
                    res.send({
                        error
                    })
                }
                else
                    res.send({
                        data,
                        location,
                        address:req.query.address
                    })
            })
        }
    })
    /*
    res.send({
        forecast:'It is Sunny',
        location: req.query.address
    })
    */
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error404',{
        Title:'404 Error',
        message:'This help article not Found',
        name:'Aman Singh'
    })
})
app.get('*',(req,res)=>{
    res.render('error404',{
        Title:'404 Error',
        message:'Page Not Found',
        name:'Aman Singh'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})