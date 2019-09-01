console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
// messageOne.textContent='ADitya'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent='Loading...'
    const location = search.value

    fetch('http://localhost:3001/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(response)
            if (data.error) {
                messageOne.textContent=data.error
                console.log(data.error)
            } else {
                //console.log(data.location)
                 messageTwo.textContent=data.location
                console.log(data.forecast)
                messageOne.textContent=data.forecast
            }
        })
    })
}) 