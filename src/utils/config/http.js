import axios from 'axios';

const http = axios.create(
    {
        withCredentials: true
    }
);
let cont=0;

/**
 * Interceptor for all requests
 */
http.interceptors.request.use((config) => {    
    /**
     * Add your request interceptor logic here: setting headers, authorization etc.
     */
     // config.async= true;
     // config.crossDomain= true;
     // config.type= "GET";
     // config.dataType= "json";
     // config.contentType= "application/json";
     config.headers={
        ...config.headers,
       'Content-Type': "application/json",
       'Accept': "application/json"       
     }

      if(config.url.indexOf("login.php")==-1){
        cont++;     
        document.getElementById("loading").style.display = 'flex';
     }     

    return config;
}, (error) => {

    /**
     * Add your error handlers here
     */

    return Promise.reject(error);
});

/**
 * Interceptor for all responces
 */
http.interceptors.response.use((response) => {

    /**
     * Add logic for successful response
     */
    if(response.config.url.indexOf("login.php")==-1){
        cont--;
        if(cont==0){
            document.getElementById("loading").style.display = 'none';
        }       
   }
    return response;
}, (error) => {
    cont--;
    if(cont==0){
     document.getElementById("loading").style.display = 'none';
    }  
    /**
     * Add logic for any error from backend
     */

    return Promise.reject(error);
});

export default http;
