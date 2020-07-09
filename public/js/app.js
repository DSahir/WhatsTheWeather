
//this is client side so fetch which is js works!feature (node dont support fetch)
console.log('Client side js file is loaded')
/*
//from this api
fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})

fetch('http://localhost:3000/weather?address=akola').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data)
        }
    })
})

const searchform =  document.querySelector('form')
const search =  document.querySelector('input')

//event listener
searchform.addEventListener('submit',(e)=>{
    e.preventDefault()      //prevent to  refresh the browser everytime
    const location =    search.value
    
    console.log('testing...')
    console.log(location)

})
*/
//now chaining all the abv to work for us
const getlocation = document.querySelector("#loc")
const searchform =  document.querySelector('form')
const search =  document.querySelector('input')
const msgOne =  document.querySelector('#msg-1')
const msgThree =  document.querySelector('#msg-3')
const msgTwo =  document.querySelector('#msg-2')
// const msgTwoSpan =  document.querySelector('#msg-2 span')
const boxOne =  document.querySelector('#box-1')
const boxTwo =  document.querySelector('#box-2')
const boxThree =  document.querySelector('#box-3')
const boxFour =  document.querySelector('#box-4')
const boxFive =  document.querySelector('#box-5')
// const box = document.querySelectorAll(".boxes")


// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);

   
//   }
const displayFunc=(data)=>{
    document.getElementById("boxOut").classList.remove("d-none")
    document.getElementById("boxOut").classList.add("d-flex")
    
    msgTwo.innerHTML=data.forcast.date +'<br>' + data.forcast.time
    
    // msgThree.innerHTML= data.forcast.date
    msgThree.innerHTML = data.forcast.temp + '°<sup style="font-size:4vw;">c</sup>' + '<p>'+ data.forcast.summary+'</p>'
    boxOne.innerHTML = data.forcast.rain + "<span>%</span>"
    boxTwo.innerHTML = Number(data.forcast.humidity)*100  +"<span>%</span>"
    boxThree.innerHTML =data.forcast.pressure +"<span>mb</span>"
    boxFour.innerHTML =data.forcast.windSpeed + "<span>km/h</span> "
    boxFive.innerHTML =data.forcast.visibility +"<span>km </span>" 
}

getlocation.addEventListener('click' , (e)=>{
    e.preventDefault();
    const getPos=(pos)=>{
        console.log(pos)
        fetch('https://maps.googleapis.com/maps/AIzaSyCP9iBZ6wJrba7uIFl2TzG2VWT6MU4tFYY/geocode/json?latlng=' + pos.coords.latitude + '%2C' + pos.coords.longitude + '&language=en').then((response)=>{
            response.json().then((loc)=>{
                console.log(loc)
            })
        })

        // document.getJSON(GEOCODING).done(function(location) {
        //     console.log(location)
        
        fetch('/weather/location?latitude='+pos.coords.latitude+'&longitude='+pos.coords.longitude).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    console.log(data.error)
                    msgOne.innerHTML = ''
                    msgTwo.innerHTML = data.error
                }else{
                    msgOne.innerHTML = ''
                    displayFunc(data)
                }

            })
        })

    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPos);
      
    }else { 
        msgOne.innerHTML = "Geolocation is not supported by this browser.";
    }    
    // e.getLocation()
    // const latitude = 
    msgOne.innerHTML = 'Loading..'
    msgTwo.innerHTML = '';
    // fetch('/weather/location?lat='+latitude+'?long='+longitude)
})

//event listener
searchform.addEventListener('submit',(e)=>{
    e.preventDefault()     
    //prevent to  refresh the browser everytime
    const location = search.value
   
    msgOne.innerHTML = 'Loading..'
    msgTwo.innerHTML = ''

    fetch('/weather?address='+location).then((response)=>{
    //fetch('https://dhanshri-weather-app.herokuapp.com/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                msgOne.innerHTML = ''
                msgTwo.innerHTML = data.error
            }else{
                msgOne.innerHTML = data.address
                displayFunc(data)
            }
        })
    })
    
})

