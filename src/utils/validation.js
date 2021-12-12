const userDataValidation = (input) => {
    let errors = {};

    if (input.username.trim().length < 6 || input.username.trim().length > 15) {
        errors.username = "Username must be between 6 and 15 characters long.";
    }
    if (input.password.trim().length < 6 || input.password.trim().length > 12) {
        errors.password = "Password must be between 6 and 12 characters long.";
    }

    if (input.password !== input.rePassword) {
        errors.noMatch = "Passwords don't match.";
    }

    return Object.keys(errors).length === 0 ? null : errors;
}

const bookDataValidation = (type, value) => {

    if (type === "title") {
        console.log(type);
        if (value.trim().length < 2) {
            console.log(value);
            return " Book title must be at least 2 characters."
        }
    }

    if (type === "author") {
        if (value.trim().length < 2 || value.trim() > 50) {
            return " Book author must  be between 2 and 50 characters."
        }
    }

    if (type === "description") {
        if (value.trim() > 350) {
            return "Book description can be up to 350 characters."
        }
    }

    if (type === "imageUrl") {
        if (value.size > 0 && !value.type.includes("image")) {
            return "Choose images to upload (PNG, JPG, JPEG...)"
        }
    }

    return null;
}

const searchDataValidation = (criteria, value) => {
    if (!criteria ||!value ||criteria.trim() === "" || value.trim() === "") {
        return "Both search keys and criteria are required."
    }
    return null;
}

export {
    userDataValidation,
    bookDataValidation,
    searchDataValidation
}
