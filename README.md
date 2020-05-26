MERN Stack Login App with Redux and Passport & JWT Authenticaation.

## How to use

1. Clone this github repo or simply download all files.

### `git clone https://github.com/Lakshya-Saini/MERN_Stack_Login_App.git`

2. Install dependencies

### `cd client && npm i`

### `cd server && npm i`

3. Create a mongodb database and paste URI in **config/keys.js**

> Inside server/config open keys.js
> Paste your MongoDB URI in MONGOURI property.

4. Run App

### `npm run dev`

> It will basically run both the servers(react & node) at the same time.
> If it fails in your terminal then simply run both servers individually

### `cd server && npm run server`

### `cd client && npm start`

## Tech

1. React
2. Node
3. MongoDB
4. Express
5. Redux

## Packages

### Server

1. Body-Parser
2. Concurrently
3. Is-Empty
4. JsonWebToken (jwt)
5. Mongoose
6. Passport-JWT
7. Password-Hash
8. Validator
9. Express
10. Nodemon

### Client

1. Axios
2. Classnames
3. Is-Empty
4. JWTDecode
5. Prop-Types
6. React-Router-Dom
7. React-Toastify
8. Redux
9. Redux-Thunk
