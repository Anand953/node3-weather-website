


//40 video
const request = require('request')


const forecast = (latitude,longitude,callback)=>{
 const url ='http://api.weatherstack.com/current?access_key=577edf0c60068907639b8b6b913e22b5&query =New%20York '+latitude +',' +longitude +'&units=m'

  request({url:url, json:true}, (error,{body})=> {
        if(error){
        callback('unable to connect to weather', undefined)
        }else if(body.error) {
         callback('unable to find location', undefined)
        } else {
            
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degress out. It feels like " + body.current.feelslike + " degress out. The humidity is " + body.current.humidity + "%.")
        }
  })
}    

module.exports = forecast


//Challenge:68 : Add new data to forecast
//
//1. update the forecast string to include new data
//2. commit your changes
//3. push your changes to github and deploy to heroku
//4. Test your work in the live application


