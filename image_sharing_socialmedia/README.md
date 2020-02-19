In this social media clone, cliental will be able to;

    [*]create an account with email, password, and username

    [] signin with an existing account

    [] logout of an existing account that is signed in

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

        i am going to add authorization middleware that will check the json webtoken with the tokens in the database to make sure the computer trying to access a given users information has logged in with the same device at one point

        [*] create middleware folder and create auth.js with will export authorization middleware

        [*] add a get route in the homepage.js that will utilize the authorization middleware and return the to user the found document

        i create a middleware that get the request header and uses the jwt method 'verify' to check the given wt to see if it matches on in the database.
        if it does than the middleware will move onto the next middleware function

        it will also return the user that was found so that can be used in the next function

        [*] add route to logout of a user on one device

        to log out a user you must update the database and remove at least one jtw from the users document
        if just the currently used wt is removed then the user will be logged out of the current device. 
        to log out of all devices a user is currently logged into one must simple reset the jwt array to a blank array

        [*] add route to logout user on all logged in devices

    2/16/20

        [*]create sign up frontend page
            I create a new folder that will hold my static files to send to the client. Right now i have a basic form set up and i will be using axios to connect the frontend page to my api

            [*] when submit button is pressed and object is created with user data that can be used in an axios request

            [*] create first axios request function

            Since this is my first time creating an XML Http request through axios I started with a simple 'get all documents from database' request that is connected to the front end with a button. with a click event that button sends an axios request to my api's /users route.


    2/17/20

        set up a post request function on the frontend js and it sends a request to my api via axios

        [*] set up axios to send a post request for a new user to be added to DB



    2/18/20

        I added some css to make my home good enough to work on the function side for while

        [*] create sign in form 
        [*] create signup function on frontend js
        [*] when a user signs in their infomation is displayed to them on the frontend 

        
TODO:

        [] when users sign in sucessfuly it should take them to their page

        [] create a logout of current device and log out of all devices buttons


