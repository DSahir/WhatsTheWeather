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

const searchform =  document.querySelector('form')
const search =  document.querySelector('input')
const msgOne =  document.querySelector('#msg-1')
const msgTwo =  document.querySelector('#msg-2')

//event listener
searchform.addEventListener('submit',(e)=>{
    e.preventDefault()     
    //prevent to  refresh the browser everytime
    const location = search.value

    msgOne.textContent = 'Loading..'
    msgTwo.textContent = ''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    //fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.log(data.error)
                msgOne.textContent = ''
                msgTwo.textContent = data.error
            }else{
                // console.log(location)
                // console.log(data)
                msgOne.textContent = data.address
                msgTwo.textContent = data.forcast
            }
        })
    })
    

})