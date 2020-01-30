
/* 
1. 
  Allowing this file to access the required packages
  create constant variables needed to interact with the client and server 
*/

require('dotenv/config');

const express = require('express'),
      mongoose = require('mongoose'),

      app = express();