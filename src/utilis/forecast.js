//Challenge
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
// const request = require('request')


// const forecast = (lat,lon,callback)=>{
//  const url ='http://api.weatherstack.com/current?access_key=577edf0c60068907639b8b6b913e22b5&query =New%20York '+lat +',' +lon +'&units=m'

//   request({url: url, json:true}, (error,response)=> {
//         if(error){
//         callback('unable to connect to weather', undefined)
//         }else if(response.body.error) {
//          callback('unable to find location', undefined)
//         } else {
//          callback(undefined, 'It is currently ' + response.body.current.temperature + ' degree out. It feels like ' + response.body.current.feelslike + 'degrees out.')
//         }
//   })
// }

// module.exports = forecast


//40 video
const request = require('request')


const forecast = (latitude,longitude,callback)=>{
 const url ='http://api.weatherstack.com/current?access_key=577edf0c60068907639b8b6b913e22b5&query =New%20York '+lat +',' +lon +'&units=m'

  request({url, json:true}, (error,{body})=> {
        if(error){
        callback('unable to connect to weather', undefined)
        }else if(body.error) {
         callback('unable to find location', undefined)
        } else {
         callback(undefined, 'It is currently ' + body.current.temperature + ' degree out. It feels like ' + body.current.feelslike + 'degrees out.')
        }
  })
}

module.exports = forecast