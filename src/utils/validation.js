const userDataValidation=(input)=> {
    let errors = {};

    if (input.username.trim().length < 6 || input.username.trim().length >15) {
        errors.username = "Username must be between 6 and 15 characters long"; 
    }
    if (input.password.trim().length < 6 || input.password.trim().length > 12) {
        errors.password = "Password must be between 6 and 12 characters long!"; 
    }

    if (input.password !== input.rePassword) {
        errors.noMatch = "Passwords don't match"; 
    }

    return Object.keys(errors).length === 0 ? null : errors;
}

const recordDataValidation=(input) =>{
}

export{
   userDataValidation,
    recordDataValidation
}
