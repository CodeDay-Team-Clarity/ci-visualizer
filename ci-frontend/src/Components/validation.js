const validation = (values) => {

    let errors = {};

    if(!values.username){
        errors.username = "username is required"
    }
    if(!values.password){
        errors.password = "password is required"
    }
    if(!values.url){
        errors.url = "url is required"
    }
    return errors;
}

export default validation