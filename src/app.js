const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utilis/geocode')
const forecast = require('./utilis/forecast')




const app = express()
//  lines define paths for Express configs
const publicDirectoryPath =  path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)


//Setup static directory to serve
 app.use(express.static(publicDirectoryPath))            

app.get('', (req,res)=>{
     res.render('index', {
        title: 'weather App',
        name: 'Anand' 
  //by injecting both of values into the template, template take advantage of creating dynamic HTML document      
     })
})
//calling response to render express goes off and convert to HTML and HTML gets back to requester

//1st argument is name of file and argument is object which contain all of the values want to access

app.get('/about', (req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Anand'
  })
})

//Goal: create a template for help page
//1. Setup a help template to render a help message to the screen
//2. Setup a help route and render the template with an example message
//3. visit the route in the browser and see your help msg print

app.get('/help',(req,res)=>{
  res.render('help',{
      helpText:'This is some Helpful text ',
      name: 'helped by Abdul',
      title:'Help'
  })
})



// app.get ('/weather', (req,res)=>{
//     res.send({
//         forecast: 'It is snowing',
//         location: 'philadelphia'
// })
// })

//Challenge54: update weather end point to accept address
//1. No address? send back an error message
//2. Address? send back the static JSON
//      ~Add adress property onto JSON which the provided address
//3. Test /weather and /weather?address=philadelphia

app.get ('/weather1', (req,res)=>{
  if(!req.query.address) {
    return res.send({
      error: 'you must provide an address!'
    })
  }

  res.send({
      forecast: 'It is snowing',
      location: 'philadelphia',
      address: req.query.address
})
})

//Challenge55: wire up /weather
//1. Require geocode/forecast into app.js
//2. use the address to geocode
//3.use the coordinates to get forecast
//4. send back the real forecast and location 

app.get ('/weather', (req,res)=>{
  if(!req.query.address) {
    return res.send({
      error: 'you must provide an address!'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location }= {}) =>{
    //default value of empty of object and destructuring
    if(error) {
      return res.send({error})
    }
    
    forecast(latitude, longitude, (error, forecastData)=> {
     if(error){         
      return res.send({error})       
     }

     res.send({
         forecast: forecastData,
         location,
         address: req.query.address
     })
    })   
                  
  })
})



app.get('/products',(req,res)=>{
    if(!req.query.search){
       return res.send({
          error: 'you must provide an search term '
        })
    }

     console.log(req.query.search)
      res.send({
        products:[]
      })
})


// app.get('/help/*',(req,res)=>{
//     res.send('help article not found')
// })

// app.get('*',(req,res)=>{
//   res.send('404 page not found')
// })


//Goal: Create and render the 404 page with handler
//
//1. Setup the template to render the header and footer
//2. Setup the template to render an error msg in paragraph
//3. Render the template for both 404 routes
//     -page not found
//     -Help article not found
//4. Test your work, visit /what and /help/units


app.get('*',(req,res)=>{
  res.render('404', {
   title:'404',
   name: 'Anand',
   errormessage: 'page not found'
  })
})

app.get('/help/*',(req,res)=>{
   res.render('404',{
    title: '404',
    name: 'Anand',
    errormessage: 'page not found'
   })
})




app.listen(3000, ()=>{
     console.log('server is running....')
})