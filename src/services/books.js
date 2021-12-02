import Parse from "../config/server";

const Post = Parse.Object.extend('Post');

const getAllBooks = async function () {
  try {
    const query = new Parse.Query(Post);
    const data = await query.find();
    const results = data.reduce((a, x) => {
      a.push({
        id: x.id,
        title: x.get('title'),
        author: x.get('author'),
        description: x.get('description'),
        imageUrl: x.get('imageUrl'),
        rating: x.get('rating'),
        createdAt: x.createdAt
      })
      return a
    }, [])
    return results;
  } catch (error) {
    console.error('Error while fetching Post', error);
  }
}

const getBookById = async function (id) {
  try {
    const query = new Parse.Query(Post);
    query.equalTo('objectId', id);
    const data = await query.first();
    const date = new Date(data.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric',})
    const result = {
      id: data.id,
      title: data.get('title'),
      author: data.get('author'),
      description: data.get('description'),
      imageUrl: data.get('imageUrl'),
      rating: data.get('rating'),
      createdAt: date,
      creator:"Default"
    }
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error while fetching Post', error);
  }
}

const getLastFourBooks = async function () {
  try {
    const query = new Parse.Query(Post);
    query.descending('createdAt').limit(4);
    const data = await query.find();
    const results = data.reduce((a, x) => {
      a.push({
        id: x.id,
        title: x.get('title'),
        author: x.get('author'),
        description: x.get('description'),
        imageUrl: x.get('imageUrl'),
        rating: x.get('rating'),
        createdAt: x.createdAt
      })
      return a
    }, [])
    return results;
  } catch (error) {
    console.error('Error while fetching Post', error);
  }
}

const getMostLikedBooks = async function () {
  try {
    const query = new Parse.Query(Post);
    query.descending('rating').limit(4);
    const data = await query.find();
    const results = data.reduce((a, x) => {
      a.push({
        id: x.id,
        title: x.get('title'),
        author: x.get('author'),
        description: x.get('description'),
        imageUrl: x.get('imageUrl'),
        rating: x.get('rating'),
        createdAt: x.createdAt
      })
      return a
    }, [])
    return results;
  } catch (error) {
    console.error('Error while fetching Post', error);
  }
}

const createBook = async (data) => {
  const book = new Parse.Object('Post');
  book.set('title', data.title);
  book.set('author', data.author);
  book.set('description', data.description);
  book.set('creator', Parse.User.current());
  book.set('category', data.category);
  // book.set('imageUrl', 'A string');
  try {
    const result = await book.save();
    console.log('Post created', result);
  } catch (error) {
    console.error('Error while creating Post: ', error);
  }
}

export {
  getBookById,
  getAllBooks,
  getLastFourBooks,
  getMostLikedBooks,
  createBook
}
