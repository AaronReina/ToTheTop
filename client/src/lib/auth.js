import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 2000,
    withCredentials: true,
});

export class AuthAPI {

    static errorHandler(e) {
        console.error("AUTH API ERROR");
        console.error(e);
        throw e;
    }

    static loggedin(){
        return instance.get('/auth/loggedin')
        .then((res) => res.data.user)
        .catch(AuthAPI.errorHandler)
    }

    static login(email, password){
        return instance.post('/auth/login',{email, password})
        .then((res) => res.data)
        .catch(AuthAPI.errorHandler)
    }

    static signup(email, password ,name){
        return instance.post('/auth/signup',{email, password, name})
        .then((res) => res.data.user)
        .catch(AuthAPI.errorHandler)
    }

    static upload(file){
        return instance
        .post("/auth/image", file, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => res)
        .catch(AuthAPI.errorHandler);
    }

    static logout(email, password){
        return instance.get('/auth/logout')
        .then((res) => console.log("Logout"))
        .catch(AuthAPI.errorHandler)
    }
  
}
