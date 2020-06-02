const request=require ('request')
const foreCast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=bde06de7eeb610d07c1adcbed4d5dcfd&query='+lat+','+long+'&units=m'

    request({url,json:true},(error,{body}={})=>{
        if(error){
                callback('Cannot connect to weather services')
            }
        else if(body.error){
            callback('Unable to find Location');
        }
        else{
            callback(undefined,body.current.weather_descriptions[0]+' It is currently '+body.current.temperature+' degrees celcius out but feels like '+body.current.feelslike+' degrees celcius out')
        }
    })
}
module.exports=foreCast