const request = require('request')
const accessToken = process.env.AccessTkn// || require('../tokens/tokenmapbox')
const darknetkey = process.env.Darknet//  || require('../tokens/tokendarknet')

const geocode = (address , callback )=>{
    //encodeURIComponent() helps encode special characters --mapbox understands it
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?'+accessToken
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token='+accessToken+'&limit=1'
    
    request({url : url , json : true}, (error,response)=>{
        console.log(response.body)
        if(error){
            callback('Unable to connect to location via mapbox' , undefined)
        }else if(response.body.features.length === 0){
            callback('Unable to find location, try agn! ' , undefined)
        }else{
            callback(undefined , {
                latitude : response.body.features[0].center[1]    ,        
                longitude : response.body.features[0].center[0]    ,        
                location : response.body.features[0].place_name
            })
        }
    })
}

const forcast = (latitude , longitude , callback) =>{
    const url = 'https://api.darksky.net/forecast/'+darknetkey +'/'+latitude+','+longitude +'?units=si'
     //request({url : url , json :true },(error , response )=>{
     request({url , json :true },(error , {body} )=>{
            if(error){
             callback('Unable to connect server - darknet')
         }else if(body.error){
             callback('No such location found -- darknet')
         }else{
             callback(undefined , 
                `Its currently `+body.currently.temperature+` degres. There is `+body.currently.precipProbability+`% chance of rain.`
                //temp : response.body.currently.temperature ,
                //precip:response.body.currently.precipProbability
            )
         }
     })
}

module.exports = {
    geocode  : geocode,
    forcast : forcast 
}