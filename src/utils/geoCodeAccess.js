const request=require ('request')
const geoCode=(address,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW1hbnRvbWFyIiwiYSI6ImNrYW95M2hvZDFzajIyenA2ZGFwdmlrdmYifQ.RxukeSV2PA5Ffc0wuTetHg'

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to map Service',undefined)
            
        }
        else if(body.features.length==0){
            callback('Unable to find Location',undefined)
        }
        else{
            const data={
                lat:body.features[0].center[1],
                long:body.features[0].center[0],
                location:body.features[0].place_name
            }
            callback(undefined,data)
        }
    })

}
module.exports=geoCode