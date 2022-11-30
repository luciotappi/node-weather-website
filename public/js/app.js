


// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })        

// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

// messageOne.textContent = "Loading"
// messageTwo.textContent = ""

weatherForm.addEventListener('submit',(e) => {
    
    // preventDefault() hace que no se reinicie los valores defecto de la pagina 
    e.preventDefault()

    const location = search.value
    console.log(location)
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
    // this will use either localhost or heroku url when called
    fetch('/weather?address='+ encodeURIComponent(location)).then((response) =>{
       
    response.json().then((data)=>{
            if (data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else 
            {
                console.log(data.location)
                console.log(data.forecast)
                messageOne.textContent = "Location : " + data.location
                messageTwo.textContent = "Forecast : " + data.forecast
                
            }
        })
    })
})
