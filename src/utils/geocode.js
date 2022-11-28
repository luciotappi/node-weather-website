const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibHVjaW90YXBwaSIsImEiOiJja3NrbnpxdjYwMDBzMnZvMng1OXIzc2hlIn0.kfZXEu5jzBrBZlwMkhbzFw'
    request({url, json:true},(error,{body})=>{
        
       
        if (error){
            callback('Unable to connect to location services!',undefined) // tambien no hace falta aclarar undefined
        } else if (body.features.length ==0) {
            callback({error:'Unable to find location. Try another search'})
        } else {
            const {place_name:name} = body.features[0]
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            console.log('ACA',body.features[0].place_name)
            callback(undefined,{
                name,
                latitude,
                longitude
            })
        }
    })
    
}

module.exports = geoCode