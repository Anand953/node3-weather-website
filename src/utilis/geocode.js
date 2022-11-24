// const request = require('request')

// const geocode =(address, Callback) =>{
//     const url='paste url' +address+'url inside that side url' 
    
//     request( {url: url, json:true}, (error , response) =>{
//       if (error) {
//          Callback('unable to connect to location services',undefined)
//       } else if(response.body.features,length ===0 ){
//           Callback('unable to find location. Try another search', undefined)
//       } else {
//          Callback(undefined, {
//             latitude: response.body.features[0].center[1],
//             longitude: response.body.features[0].center[0],
//             location : response.body.features[0].place_name
//          })
//       }
    
//     })
// }

// module.exports = geocode


//40 video : modified code
const request = require('request')

const geocode =(address, Callback) =>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.' +address+'json?access_token=pk.eyJ1IjoiYW5hbmQ1NTk1IiwiYSI6ImNsOXlrZWIxdDA1dDAzbm14d2Noend2amEifQ.yWSKtvM3Y2nLvw53XEPeE' 
    
    request( {url, json:true}, (error , {body}) =>{
      if (error) {
         Callback('unable to connect to location services',undefined)
      } else if(body.features,length ===0 ){
          Callback('unable to find location. Try another search', undefined)
      } else {
         Callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location : body.features[0].place_name
         })
      }
    
    })
}

module.exports = geocode