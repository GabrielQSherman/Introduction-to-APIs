This is my repo for my REST Api while I follow along

the tutorial I'm following along with a tutorial by Programing with Mosh

you can find the video here; https://www.youtube.com/watch?v=pKd0Rpw7O48;

As always the first steps are to use the command 'npm init' in the command line, then install neccesary dependencies

Packages used in this tutorial:

nodemon
express
mongoose
dotenv


after setting up the package.json file I will add a file to my project that will act as a juction for all my route handling. this file will be named 'index.js' and will be the main js file used at every route on the site.

after the file is created I can add a npm command for starting up the server and making it run locally. 

It will be within the 'scripts' object in my package.json. my commands are start and dev and will start the program in either client mode or developer mode. 

npm start will start the server using node.js while npm dev will start the server using nodemon. nodemon will restart the server every time a change to my apis code is changed