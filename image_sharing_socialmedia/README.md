In this social media clone, cliental will be able to;

    []create an account with password and username

    []see any user via search and follow them if desired

    []upload photolinks

    []leave comments on photo post

    []favorite photo post 


    2/14/20

        i have create an npm project, firstly i will work on my backend.
        this will involve connecting to my mongodb account where user information will be stored. as well as their post in the future

        [*] the server can connect to my cloud db 

        [*] server is accessable via localhost (when server is run from the terminal)

    2/15/20

    Using this article https://tinyurl.com/ud9b9kz by Frank Atukunda to help me learn about and implement JSON Web Tokens for the first time in one of my REST APIs

    for this task i installed 'bcryptjs' and 'jsonwebtoken' with the 'npm i' command 

        [*] connect the homepage router to the index.js express application to send 'home' to the client

        i added some middleware to the express application, whenever a route is called express.json() will be used as middleware to parse the body of the request into JSON if need be

        [*] connect the schema export from ./models/User.js to the homepage router + set up User Schema

        [*] finish creation of schema. add email, name, password, and array for jw tokens to be stored

        i added two methods for my schema to use, one that for creating a new jwt when the user logs in with an existing account. and another for when the user attepmts to log in, it will make sure the password matches with the jwt in the database

        [*] add two post routes to homepage.js
        [*] implement one post route to handle creation of new user
        [*] implement one post route to handle logging in of existing user

