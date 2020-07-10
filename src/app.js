const path = require('path')
const express = require('express')
const hbs = require('hbs')  //for partials
const weather = require('./components')

//html pages need absolute path and not relative---we have core node module path
// console.log(__dirname)
// console.log(__filename)
const app = express()
//app.com   //app.com/help  //app.com/about
const port = process.env.PORT   //first for heroku and latter for local 


//define paths for express config
const publicPath = path.join(__dirname , '../public')
const tempPath = path.join(__dirname,'../templates/hbs')
const partialsPath = path.join(__dirname,'../templates/partials')

//set uo handbars engines n views location
app.set('view engine' , 'hbs')  //to use dynamic templates --view engine like express
app.set('views' , tempPath)     //changing the bydefault view/hbs-files to some random directory
hbs.registerPartials(partialsPath)    //dir where partials occur
//customise the server
//static means accerts are staic n dont change
app.use(express.static(publicPath))     //setup static directory to serve

// app.get('' , (req , res)=> {
//     res.send('<h1>hello express!</h1>') //sending html as response
// })

app.get('' , (req , res)=> {
    res.render('index',{
        
        name:'Dhanshri Ahir'
    })    //directly renders from veiws by default
})


// app.get('/help' , (req,res)=>{
//     //res.send('HELP PAGE!')
//     res.send({          //sending json/obj -array
//         name:'Dhanu',
//         age:20
//     })   
//     //express detects jaon and sends stringify 
// })
app.get('/help' , (req,res)=>{
    //res.send('HELP PAGE!')
    res.render('helpme',{
        msg:'This is the help dynamic page.',
        title:'Help',
        name:'Dhanshri'
    }) 
    //express detects jaon and sends stringify 
})
// app.get('/about' , (req ,res)=>{
//     res.send([{                       //sending json/array
//         name : 'OM'
//     },{
//         name:'TANU'
//     }])
// })

app.get('/about' , (req ,res)=>{
    res.render('about',{
        title:'About',
        name:'Dhanshri'
    })
})


app.get('/weather',(req,res)=>{
//app.get('https://dhanshri-weather-app.herokuapp.com/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            err:'Must provide a address'
        })
    }
    //setting the lat,long ,location to {} empty obj
        weather.geocode(req.query.address , (error, {latitude , longitude , location}={}) => {
        if(error){
            return res.send({error})
        }
        //console.log('Data ' , data)
        weather.forcast (latitude ,longitude , (error , forcastdata)=>{
            if(error){
                return res.send({ error})
            }
            //console.log(location)
            //console.log(forcastdata)
            res.send({
                address:location,
                forcast:forcastdata,
                
            })
        })
    })
    
})
app.get('/weather/location' , (req,res)=>{
    console.log(req.query.latitude )
    console.log(req.query.longitude )
    weather.forcast (req.query.latitude ,req.query.longitude , (error , forcastdata)=>{
        if(error){
            return res.send({ error})
        }
        //console.log(location)
        // console.log(forcastdata)
        res.send({

            // address: forcastdata.place,
            forcast:forcastdata,
            
        })
    })
})
//query srtings in url ?key=value&

// app.get('/products', (req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             err:'Must provide a search term'
//         })
//     }

//     console.log(req.query)
//     res.send()      //can send only one send  
// })

app.get('/help/*',(req,res)=>{
   res.render(('error'),{
       title:'404',
       msg404:'This help text not found'
   })
})
//404 error -- should be at last so no other match is found
app.get('*',(req,res)=>{
    res.render(('error'),{title:'404',msg404:'404 error ! Page not found'})
})


//start the server--3000 port for now
app.listen(port , ()=> {
    console.log('Server running...'+port)
})