In this social media clone, cliental will be able to;

    [*]create an account with email, password, and username

    [*] signin with an existing account

    [*] when users sign in sucessfuly it should take them to their page

    [*] logout of an existing account that is signed in

    []see any user via search and follow them if desired

    [*]upload photolinks


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

   2/19/20

        Today I will be added a templating engine to load a users page when the login, from there they can explore other users as well as look at their liked/favorited photos

        [*] npm i pug morgan helmet and require them in the index.js file

        [*] set up pug to redirect users once they log in

    2/20/20

        Today i will continue my work on my template html pages

        [*] users are redirected to thier /profile page when they sucessfully log in     

    2/21/20

        Today Im trying to figure out how to dynamically load a users infomaition to a pug made profile page. Using my auth middleware I am able to set a request variable to all the users document info. I want to create a middleware function that parses that document into request variables that can be passed to my pug 'render' method and load in the users infomation. the next challenge would be to be able to see the users infomation without singing in but restrict access to post and edit the profile page. I signed in user should be able to modify their profile page at will as well as create new post from this page

    2/22/20

        I fixed pug not being able to load css made for the html pug outputs.
        also figured out why the profile route was getting caught up. The authorization header must be properly passed in the request object otherwise header('Authorization') will be undefined, added some error handling for scenerio

        I deleted static 'profile' files because the profile page will be written in a templating engine instead of static files

    2/23/20

        after logining in successfully the user will have a page rendered with their infomation.

    3/7/2020

        implementing document cookies

        cookies will be utilized to store JWT when user logs in

        using cookies the users data can be loaded and loaded via templating engine

    3/8/2020

        i was not able to complete much today but on my next day of work i will better implement cookies/JWT and make getting to a users profile from sign in page seemless

    3/9-11/2020

        The program is able to better utillize the pug templating engine, my users profiles update dynamically and post can be made. some frontend error checking needs to be completed for users posting form

    3/12-23/2020

        I have now gotten fairly familiar with the pug templating engine making a user profile page. 
        I use one external JS script to handle the post request but all elements on the page are created using pug. This has made making HTML pages very interested and I quite like using the pug engine.

        I have implemented a form to upload pictures, a display of all the users post appears when the page loads. And I have implemented the API call to my backend to get the form working. Logic for the post request is not handled directly in pug but I can now create pages using no HTML code which is great. 
        
        Challenges I face are patching post and deleting post. I will need to implement a system of IDing post so specific post can be deleted even if content is similar. I could try creating a schema to go inside of the users profiles or seperatly store post and link them to the users account. I have not found what the best practice will be. After I will implement other users interaction with post, adding like and favorite features as well.
        
    3/24-25/2020

         impelemented deleting post individually and all together. I created added some small features such as a message to make a first post in a user has no post.

         created two routes in order to delete post/s. I also moddified my post creation to include a id generator to distiguish post when requesting from the frontend. There is no check in place to avoid duplicate post ids but the likely hood of a duplicate post is over 1 in one google!

    3/26/2020

        add route for when user logs out of their account, they can redirect themselves to the signin page with a button

        updated a bunch of css to make the profilepage more responsive and fun/interesting to interact with. This was all done with :hover in CSS
    
    3/27/20

        adding routes to homeRouter that will render pug templates. All js api request will come from one javascript file in the public folder. A new template will be used to create a login page, signup, 'home' (this will redirect to signup or sign, this is the root route)
        the logout page will also use the same js public file. They will all use their own css file. 

        signin and sign up pages css is complete

    3/28-30/2020

        implement the api calls for the signin and signup pages, get it to direct the user to the profile once they sign in.

        routes of the homepage can be traversed via buttons on the signin/signup/home/logout page

        creating a new user is working using the form on signup page. users can login with the form on signin page

        add some styling changes so delete button on profile images appear dynamically
    
    4/1/2020

        implement api request for userprofile page to update a post caption. A prompt will ask user to input a new caption for the post they choose. If the prompt is left blank or cancled the request will not be made. Otherwise a patch request will be made and the caption will be updated on the server. When a sucessfull request is made the page will be reloaded.

        I needed to create the route handling for the patch request in the userRoute file. I was having trouble understanding why the server must delete the old post and insert a new one in order to update the post caption. I was not able to program the logic beileved would work but the route is functional and working perfectly. I will update it in the future to better understand the limitations of express.

    4/2-4/2020

        created route for user search from the homepage. 

        when a vaild users profile has been search the option to vist their profile page will apear and window.location will update when a button is pressed.

        if the user does not have post or the a username is not in the database the client will be displayed a message regarding the problem

        add styling and template to suport client-side search for a user's post by username


    4/5/2020

        create a pug template for the public profile. will be rendered if a get request is called at the root route with a single request parameter being the username of the profile 


    4/6-7/2020

        implement the template for the public profile page similar to the private(logged in) profile page but lacking the posting of new post and deleting/updating of old

        if the route of a non-existing/no post user is requested then they will be rendered a page where they can direct themselves back to the homepage

        public profiles can be viewed with or without being logged in, when logged in it will display the logged in user's username and grant them access to like photos on anothers page give they are not viewing their own page

        moddifed the auth middleware route to allow it to check if a user does have a vaild JTW but still continues to the next middleware function even if not. They will be passed to the next middleware function so instead of ending the request/response cycle the next middleware function will need to check if the user was authorized and what to do if so/if not.

        reformat logout template page to handle anytime a user needs to be redirected so they can direct themselves to the login page or homepage

    4/8-10/2020

        public profile allows a user to vist a page logged in or not logged in. When logged in a like button is added to every picure. When not logged in these elements will never be created. also one who is not signed in will see a button on the top infomation bar to allow them to go to the sign in page easily

        Adding ondblclick functions for each button in the cases that they were created. They will make a fetch request to add a userID to the array of likes

        the likes array for each post may be a simple single dimensional array of ids of users who liked your post, it may also be an array of objects that would include this id but then other info, like time at which the user liked an image, and other information;

[*] complete profile color to appear on pub pro
[] change pro color from priv profile page
[] go to private/public profile from home, if signed in
[] update homeroute.js to check for bad submits of new accounts
[] add home button to public profile template
[] add color change features to profile pages