[![DeepScan grade](https://deepscan.io/api/teams/16321/projects/19599/branches/511204/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16321&pid=19599&bid=511204)

[https://nradkova.github.io/read-aloud](https://nradkova.github.io/read-aloud/) 

## <span style="color:lightgreen; font-size:30px">**READ ALOUD**</span>

### <span style="color:lightgreen">A PLATFORM FOR PEOPLE WHO LOVE BOOKS AND ARE READY TO SHARE THEIR PASSION</span>

---------------------![screenshot](cover_book.png)----------------------
## A project for SoftUni React JS course

## Technologies used:

- React JS
- Leaflet React      
- Parse
- HTML & CSS

## Services used:

- Back4app as BaaS
- Cloudinary as cloud storage
- Github Pages for deployment
- OpenStreetMap for mapping and geolocation

## Database classes:

- User

```javascript
{
  "username": String,
  "password": String,
  "readingList": Relation <Book>,
  "eventList": Relation <Event>
}
```

- Book

```javascript
{
  "title": String,
  "author": String,
  "description": String,
  "imageUrl": String,
  "category": Array,
  "bookRating":  Pointer <BookRating>,
  "creator": Pointer <User>
}
```

- BookComment

```javascript
{
  "text": String,
  "book": Pointer <Book>,
  "creator": Pointer <User>
}
```

- BookRating

```javascript
{
  "star": Number,
  "voted": Array
}
```

- Event

```javascript
{
  "name": String,
  "description": String,
  "status": String,
  "imageUrl": String,
  "date": Date,
  "location": GeoPoint,
  "creator": Pointer <User>
  "subscription":  Pointer <EventSubscription>
}
```

- EventComment

```javascript
{
  "text": String,
  "event": Pointer <Event>,
  "creator": Pointer <User>
}
```

- EventSubscription

```javascript
{
  "event": Pointer <Event>,
  "subscribed": Array
}
```
## Users Access and Interaction with READ ALOUD:

-  `Guest` users can expirience all public parts of the application - view all books and events posted, as well as their details and comments attached. They can search through events and books, based on certain criterias.

- `Authenticated` users can comment on posts, rate them, subscribe (or unsubscribe) for events, create their own reading list and then add  (or remove) books to it.

- Authenticated users can create and publish posts (books and events). Thus becoming owner of a record, they are `authorised` to edit it, cancel it (for an event).

