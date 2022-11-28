const request = require("request");

const forecast = (latitude,longitude,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=0ff2a5e0089ca948ea602290c20e78a2&query='+ encodeURIComponent(latitude)+ ','+ encodeURIComponent(longitude)+'&units=f'
    request({url,json:true},(error,{body})=>{

        const  {temperature,precip:precipitations,name} = body.current
        if (error){
            callback('Unable to connect to weather services')
        } else if (body.error){
            callback('No information retrived for coordinates input. Try another')
        } else {
            callback(undefined,{
                temperature,
                precipitations,
                name
            })
        }
    })

}

module.exports = forecast
