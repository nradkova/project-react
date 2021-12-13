export const MAX_DEFAULT_RATING=5;

export const DEFAULT_BOOK_CATEGORIES=["classic", "fantasy", "science fiction", "adventure", "romance", "detective", "horror", "thriller", "historical fiction", "YA fiction", "travel", "education & teaching", "social sciences", "biography", "cooking", "art", "self - help", "motivational", "health & fitness", "history", "religion & spirituality", "crafts & hobbies", "business & money"];

export const DEFAULT_BOOK_URL="/default_book.png";

export const INITIAL_AUTH_VALUE = {
    userId: "",
    username: "",
    sessionToken: ""
}

export const INITIAL_AUTH_STATE = {
    userId: "",
    username: "",
    sessionToken: ""
}

export const INITIAL_USER_FORM_VALUE = {
    username: "",
    password: "",
    rePass: ""
}

export const INITIAL_AUTH_VALIDATION_ERROR = {
    username: null,
    password: null,
    rePass: null,
    exists: null,
    credentials:null
};

export const INITIAL_BOOK_VALUE = {
    id: "",
    title: "",
    author: "",
    description: "",
    imageUrl: "",
    rating: "",
    createdAt: "",
    categories:[]
}

export const INITIAL_BOOK_VALIDATION_ERROR = {
    title: null,
    author: null,
    image: null,
    description: null,
};
