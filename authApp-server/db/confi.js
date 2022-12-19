const  mongoose  = require('mongoose');

const dbConnection= async() => {
    try {

        await mongoose.connect(process.env.BD_CNN,);
        
        console.log('DB OnLine');

    }catch(error){
        console.log(error);
        throw new Error('error a la hora de incializar la DB')
    }
}

module.exports = {
    dbConnection
}