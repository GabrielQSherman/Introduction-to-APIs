
//Project; Create a web app for a college site that holds post of graduates and includes the following properties

https://plattcollege.edu/about-us/our-graduates/
First Name, Last Name,
Graduation Year/Month,
Job Title
Company Name
Key Skills (array of strings)
GitHub
LinkedIn
Twitter
Photo (LinkedIn profile link)

NPM packages use for backend;

"dotenv": "^8.2.0",
"express": "^4.17.1",
"helmet": "^3.21.2",
"mongoose": "^5.8.11",
"morgan": "^1.9.1",
"nodemon": "^2.0.2"

//steps to setup api project -- 

1.npm initalized and neccecary packages installed with 'npm i' or npm install

2. code a index.js file that will be the main hub for the route handling of this project. 

3. connect to the local host with express

4. connect to mongodb with mongoose

5. set enviorment variables and passwords with dotenv, make .env file 

6. use express to handle GET methods for some basic Routes.

7. Create routes folder that contains route handling for specific routes. like the homepage(root-route) or the admin of the database/server that works on a diffrent route to add documents to the database

8. Create a models folder that contains mongoose schemas, this is how data will be formated when going into and out of the database. input will come in as json or formdata and then the document will be json inside of the database. 

Only one schema will be needed for this project because it is just the students graduation post, then comments and messages can be added later

2/14/2020 Final Thoughts

I created project to test my ability to connect the front-end to my API that get data (documents) from MongoDB

This was my first time attempting the front-back end connection so i kept it simple using the builting .fetch. Using fetch i was succesfully able to make GET, PUT, POST, and DELETE request to my api (located in my routes folder)

My client frontend only includes get request, it includes a search/filter feature that is handled in the backend. so only the filtered documents would be sent from the API. 

My Admin Route has more access to the database via my API. On this page one can send all CRUD methods to the API via an HTML page.
