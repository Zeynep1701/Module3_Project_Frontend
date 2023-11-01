# Book Lovers

## Description
"Book Lovers" is a user-centric web application designed to bring book enthusiasts together, enabling them to explore, review, and discuss a wide variety of books. Built with the MERN stack, it provides a seamless and interactive platform for users to access detailed information about books, share their reading experiences, and connect with a community of fellow book lovers. Whether you're looking to discover your next great read or share your thoughts on a recent find, "Book Lovers" is your go-to destination.

## User Stories
- 404: As an anonymous person /user, I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
- Signup: As anonymous person, I can sign up in the platform so that I can start looking for different books.
- Login: As a user, I can login to the platform so that I can see all the books.
- Logout: As a user, I can logout from the platform so no one else can use it.
- Add reviews: As a user, I can add a review and a rating so that I can share it with the community.
- Update reviews: As a user, I can edit my review if I want to correct or change it.
- Update profile: As a user, I can edit my profile.
- Delete profile: As a user, I can delete my profile if I don't want to be a part of the community anymore.


## Backlog Functionalities
- Favorite authors/books inside user model
- 1:1 chats, group chats

<br>

# Client
## Routes

| Path | Component | Permissions | Behavior |
|--------------------|--------------|------------------------|-----------------------|
| `/books` | BooksList, BookItem | Logged-in users | Displays all books |
| `/books/:bookId` | BookDetail | Logged-in users | Displays specific book details |
| `/authors` | AuthorsList, AuthorItem | Logged-in users | Displays all authors |
| `/authors/:authorId` | AuthorDetail | Logged-in users | Displays specific author details |
| `/login` | Login | Users not logged in | Login page for users |
| `/profile` | UserProfile | Logged-in users | Displays user's profile information |
| `/reviews` | reviewForm | Logged-in users | Form for users to submit book reviews |
| `/reviews` | UpdateReviewForm | Logged-in users | Form for users to update their book reviews |
| `/users` | UpdateUserForm | Logged-in users | Form for users to update their profile information |

## Compontents
- LoginPage
- SignupPage
- ReviewForm
- UpdateReviewForm
- ProfilePage
- UpdateUserForm
- BooksPage
- BookDetailsPage

## Services
- Auth Service
    * auth.login(user)
    * auth.signup(user)
    * auth.logout()
    * auth.me()
    
- Backlog Service
    * backlog.filter(type, status) // for different types of media and if they are done or not
    * backlog.detail(id)
    * backlog.add(id)
    * backlog.delete(id)
    * backlog.update(id)

<br>

# Server/Backend
## Models

Author model
```javascript
{
  name: { type: String, unique: true, require: true },
  image: { type : String },
  birthday: { type: Date },
  country: { type: String },
  books: { type: mongoose.Schema.Types.ObjectId, ref: "Books" },
}
```
Book model
```javascript
{
  title: { type : String, unique: true, require: true },
  image: { type : String },
  authorId: { type: Schema.Types.ObjectId, ref: "Author" },
  publisher: { type: String },
  publishingDate: { type: Date },
  description: { type: String },
  categories: [ {
    type: String,
    enum: [
      "Mystery",
      "Horror",
      "Romance",
      "Fiction",
      "Fantasy",
      "Drama",
      "Self-help",
    ],
  } ],
}
```
Review model
```javascript
{
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, required: true},
    reviewDate: { type: Date, default: Date.now },
    comment: { type: String, required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "book" }
}
```
User model
```javascript
{
    userName: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    image: { type: String, default: "https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"},
    favoriteBooks: [String],
    favoriteAuthors: [String]
  }
```
<br>

# API Endpoints (Backend Routes)
## Authentication

- POST /auth/signup
    - Description: Registers a new user
    - Body:
        * username (required)
        * email (required)
        * password (required)
        * image (optional, file)
    - Response: Returns the created user object
- POST /auth/login
    - Description: Logs in a user
    - Body:
        * email (required)
        * password (required)
    - Response: Returns a token if login is successful
- GET /auth/verify
    - Description: Verifies a user's token
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns the payload of the verified token

## Books

- GET /books
    - Description: Fetches all books
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns an array of book objects
- GET /books/:bookId
    - Description: Fetches a specific book by ID
    - Parameters:
        * bookId: ID of the book
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns the specific book object
## Reviews

- GET /reviews/:bookId/reviews
    - Description: Fetches all reviews for a specific book
    - Parameters:
        * bookId: ID of the book
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns an array of review objects
- POST /reviews
    - Description: Creates a new review
    - Body:
        * user (required): ID of the user
        * rating (required)
        * comment (required)
        * book (required): ID of the book
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns the created review object
- PUT /reviews/:id
    - Description: Updates a review by ID
    - Parameters:
        * id: ID of the review
    - Body:
        * Fields that need to be updated
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns the updated review object
- DELETE /reviews/:bookId/reviews/:id
    - Description: Deletes a review by ID
    - Parameters:
        * bookId: ID of the book
        * id: ID of the review
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns a confirmation message

## Users

- GET /users/data
    - Description: Fetches the current user's data
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns the user's data
- POST /users
    - Description: Creates a new user
    - Body:
        * Fields required to create a user (e.g., email, password, etc.)
    - Response: Returns the created user object
- PUT /users/:userId
    - Description: Updates a user by ID
    - Parameters:
        * userId: ID of the user
    - Body:
        * Fields that need to be updated
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns the updated user object
- DELETE /users/:userId
    - Description: Deletes a user by ID
    - Parameters:
        * userId: ID of the user
    - Headers:
        * Authorization: Bearer [token]
    - Response: Returns a confirmation message

<br>

# Links
## Git
Client Repository:
- https://github.com/Zeynep1701/Module3_Project_Frontend

Server Repository:
- https://github.com/Rin-o/Module3_Project_Backend

Deploy Links:
- https://booklovers-ironhack.netlify.app
- https://booklovers.adaptable.app

## Collaborators
- Nadia Escobar
- Rino Ito
- Zeynep Ünal