export const MAX_DEFAULT_RATING=5;

export const DEFAULT_BOOK_CATEGORIES=["classic", "fantasy", "science fiction", "adventure", "romance", "detective", "horror", "thriller", "historical fiction", "YA fiction", "travel", "education & teaching", "social sciences", "biography", "cooking", "art", "self - help", "motivational", "health & fitness", "history", "religion & spirituality", "crafts & hobbies","comedy", "business & money"];

export const DEFAULT_BOOK_URL="/default_book.png";

export const DEFAULT_EVENT_URL="/default_event.png";

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
    required:null
};

export const INITIAL_EVENT_VALUE = {
    id: "",
    name: "",
    date: "",
    location: "",
    description: "",
    imageUrl: "",
    status: "",
    createdAt:"",
    creator:""
}

export const INITIAL_EVENT_VALIDATION_ERROR = {
    name:null,
    date: null,
    location: null,
    description: null,
    image: null,
    required:null
}

