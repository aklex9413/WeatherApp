const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const imageWeather = document.querySelector('#image-weather')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    const token = '26a81dabd0b55624b0d7783eff255f40'

    messageOne.textContent = 'Cargando...'
    messageTwo.textContent = ''

    if(location){
        fetch(`http://api.weatherstack.com/current?access_key=${token}&query=${location}`).then((response) => {
            response.json().then((data) => {
                console.log(data)
                if (data.error) {
                    resetData()
                    messageOne.textContent = 'Ocurrio un Error, intentalo de nuevo.'
                } else {
                    imageWeather.src = data.current.weather_icons[0]
                    messageOne.textContent = data.request.query
                    messageTwo.textContent = data.current.weather_descriptions
                    messageThree.textContent = `Temperatura: ${data.current.temperature} grados`
                    messageFour.textContent = `Viento: ${data.current.wind_speed} kmph`
                    messageFive.textContent = `Sensación térmica: ${data.current.feelslike} grados`
                }
            })
        })
    }else{
        resetData()
        messageOne.textContent = 'Introduce una ciudad.'
    }
})

function resetData(){
    imageWeather.src = ''
    messageOne.textContent = ''
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
}