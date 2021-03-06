This is my repo for my REST Api

the tutorial I'm basing this project off of is by Programing with Mosh

you can find the video here; https://www.youtube.com/watch?v=pKd0Rpw7O48;

As always the first steps are to use the command 'npm init' in the command line, then install neccesary dependencies

Packages used in this tutorial:

"config": "^3.2.5",
"debug": "^4.1.1",
"dotenv": "^8.2.0",
"express": "^4.17.1",
"helmet": "^3.21.2",
"joi": "^14.3.1",
"mongoose": "^5.8.10",
"morgan": "^1.9.1",
"nodemon": "^2.0.2",
"pug": "^2.0.4"

after setting up the package.json file I will add a file to my project that will act as a juction for all my route handling. this file will be named 'index.js' and will be the main js file used at every route on the site.

after the file is created I can add a npm command for starting up the server and making it run locally. 

It will be within the 'scripts' object in my package.json. my commands are start and dev and will start the program in either client mode or developer mode. 

npm start will start the server using node.js while npm dev will start the server using nodemon. nodemon will restart the server every time a change to my apis code is changed

First Express Request
inside the index.js use the instance of express 'app' and the GET method to send 'Hello World' to the user when on the root route

Request on specific route
using the GET method I allow the client to sucessfully request the api/courses route and receieve a json object with an array inside

USING ROUTE AND QUERY PARAMERTERS
apis use route parameters to get data from the client that is required to complete the request
and example of this: webadress/post/:id -- the id will be a number that is given by the client to get a specifc response, the javascript uses the colon to disiguish a route parameter

another way to get a specific request is by using query parameters, this is for requests that are optional and will be formated: webaddress/post/123?sortBy=Date -- in this case the response can be sorted by date if the client request that it is
query parameters are stored as key/value pairs in the req.query object

npm i mongoose
Instal Joi to validate request, the Joi module will be used to create a schema similarly to how one can with mongoose but this does not come with the database features of mongoose. You can set up how a valid post should be set up. ie which keys it must have and what type of values the keys should be or even their length or format.

USING POST METHOD

first set the users req.body to a const variable and check if its valid through the validate method of Joi. this can be done through middleware to make the code reuseable and cleaner for each route handling method that requires validation

next one can add the request body to the database and send response to the client that it was a successful post

USING PUT METHOD   
This method is also used similarly to PATCH. the diffrence being that PUT will replace the targeted resource while patch has to do less operations because it is only selecting the targeted key/value pairs

to complete a put method safely one must validate the req.body as well as confim the target resource exist in the data base. if the resource does not exist one should send a status of 404 if the user give a request that returns an error durring validation one should send a status 400

USING DELETE METHOD

in order to delete a resource you must only require a resources unique id. if the id returns an existing resource then it can be removed from the database


//INSTALING MORE MIDDLEWARE/PACKAGES
install morgan & helemet, then require them in the index.js file as a const and write the code app.use(morgan()) app.use(helment())

morgan will log every request to the console. this helps in testing but would not be recomended in production, i will pass 'tiny' into the parameters so that it logs a shortened message of each request. This program will only run morgan for request if it the env returns that it is in development mode. if the code export NODE_ENV=production(or anything but development) is run in the command line then morgan will not be enabled

helmet is a bunch of smaller middleware that help secure this express application

install the npm package 'config' --- npm i config
this will be for configuring this project, another propular repo is called 'rc'
configuration files will be in json format and will be held in the 'config' folder for this project 

install the package 'debug' this will allow the program to log to the console more dynamicly than with console.log
in this program I require debug twice to have one set up debug logs pertaining to startup and one for logs pertaining to my database. then before I start my applicataion i can choose what logs i want to be displayed or not displayed in the console.

install the package 'pug' this will send dynamic html pages to the client and will handle everything that is stored in the views folder


