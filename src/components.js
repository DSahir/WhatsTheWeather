const request = require('request')
const { response } = require('express')


// var dd = d.getDate().toString() + "" + d.getMonth().toString() + ", " + d.getFullYear().toString();
const geocode = (address , callback )=>{
    //encodeURIComponent() helps encode special characters --mapbox understands it
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+accessToken+'&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+process.env.MAPBOX+'&limit=1'
    
    request({url : url , json : true}, (error,response)=>{
        
        if(error){
            callback('Unable to connect to location via mapbox' , undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location, try agn! ' , undefined)
        }else{
            console.log( response.body.features[0].center[1]    )        
            console.log( response.body.features[0].center[0]    ) 
            callback(undefined , {
                latitude : response.body.features[0].center[1]    ,        
                longitude : response.body.features[0].center[0]    ,        
                location : response.body.features[0].place_name
            })}
            
    })
}

const forcast = (latitude , longitude , callback) =>{
    var d = new Date(); 
    var dd = d.toDateString()
    var tt = d.toLocaleTimeString()
    const url = 'https://api.darksky.net/forecast/'+process.env.DARKNET +'/'+latitude+','+longitude +'?units=si'
    //const url = 'https://api.darksky.net/forecast/'+ darknetkey +'/'+latitude+','+longitude +'?units=si'
     //request({url : url , json :true },(error , response )=>{
     request({url , json :true },(error , {body}={} )=>{
            if(error){
             callback('Unable to connect server - darknet')
         }else if(body.error){
             callback('No such location found -- darknet')
         }else{
            var d = new Date(); 
            var dd = d.toDateString()
            var tt = d.toLocaleTimeString()
            // console.log(body)
             callback(undefined , {
                date:dd,
                time:tt,
                temp : body.currently.temperature,
                rain : body.currently.precipProbability,
                humidity : body.currently.humidity,
                pressure : body.currently.pressure,
                windSpeed : body.currently.windSpeed,
                visibility : body.currently.visibility,
                summary : body.currently.summary,
             
             }) 
         }
     })
}

module.exports = {
    geocode  : geocode,
    forcast : forcast 
}