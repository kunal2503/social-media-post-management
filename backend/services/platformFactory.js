const faceBookService = require("./platform/facebook.services");


const services = {
    facebook : faceBookService,
}

exports.getPlatformService = (platform) =>{
    const service = services[platform.toLowerCase()];
   if(!service){
    throw new Error("Unsupported platform");
   }
   return service;
}