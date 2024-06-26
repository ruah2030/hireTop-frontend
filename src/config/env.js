

const envConfigVar = {
    production: {
        apiBaseUrl:'http://127.0.0.1:8000'
    },
    development: {
        apiBaseUrl:'http://127.0.0.1:8000'
    }
}


const envConfig = function () {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        return envConfigVar.development
    } else {
        return envConfigVar.production
    }

   
}
export default envConfig;