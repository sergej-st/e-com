
const validator = (schema) =>{

    return function(payload){
        return schema.validate(payload,{abortEarly:false})
    }
}

module.exports = validator