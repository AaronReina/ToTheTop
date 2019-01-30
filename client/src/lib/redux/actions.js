export const login = (user) => {
    return {
        type: "LOGIN",
        user
    }
  }
  
  
  export const logout = () => {
    return {
        type: "LOGOUT",
    }
  }
  
  export const errorMessageAction = (message) => {
    return {
        type: "ADD_MESSAGE",
        message
    }
  }
  
  
  export const clearMessages = () => {
    return {
        type: "DELETE_ALL_MESSAGES",
    }
  }
  
  export const imgUpload = (e) => {
    return {
        type: "IMG_UPLOAD",
        image: e.image
    }
  }
  