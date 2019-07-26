# aratta-express-boilerplate

This is an express boilerplate which inspired from laravel framework with some simplifications.

Special thanks to Bravebinary for helping us for making this happen you can check out their website through this link:

http://bravebinary.com


# Features

* Easy jwt authentication
* Routing system
* MVC pattern
* Migrations
* Env
* Sequelize Orm
* mySql

# Creating the project

Install the aratta-express cli if it isn't already installed

```
npm i -g @aratta-studios/aratta-express
```

Then

```
aratta-express projectName
```

Select aratta-express-boilerplate

# Usage
```
cd projectName
npm start
```

# Db configuration

Edit config/config.json

Edit env/index.js

# Models and migrations
For models and migrations we used sequelize
Read more in this link:
http://docs.sequelizejs.com/manual/migrations.html
Also you can generate models from database using this library
https://github.com/sequelize/sequelize-auto

In the index.js in models folder, we connect sequelize with our database and configure this connection
Also we link our models to sequelize and specify the associations and relations

You can take a look at this file in the models/index.js and read the comments to learn more

# Folder Structure

```
project name
  /auth ( authentication functions, currently configured for jwt authentication )
  /config (database config for sequelize)
  /controllers (controllers)
  /env (project environment configurations)
  /migrations (sequelize migrations)
  /models (models)
  /routes (connects routes to controller functions)
```

# Controllers
Classes that containing functions that used in routes for getting response data or etc functions are something like this:
```ecmascript 6
import {Doctor} from '../models';
import QueryHelper from "../helpers/queryHelper";

/**
 *
 * @param req
 * @param res
 * @constructor
 */
export function createOrUpdateDoctor(req, res) {
  const body = req.body;
  new QueryHelper(Doctor).createOrUpdate(body, res);
}

/**
 *
 * @param req
 * @param res
 */
export function readAllDoctors(req, res) {
  new QueryHelper(Doctor).find(null, res).all();
}

// and so on ...
```

# Routes
Something like this:
```ecmascript 6
import {createExample, ... , login, signup} from "../controllers/exampleController";

module.exports = function(app){

  app.post('/login', login);
  app.post('/signup', signup);
  app.post('/create-user', createUser);
  app.post('/get-users',isJwtAuthenticated, getUsers);
  app.post('/create-example',isJwtAuthenticated, createExample);
  app.post('/get-examples',isJwtAuthenticated, getExamples);

  //other routes..
};


```

If you want your route protected by jwt just use isJwtAuthenticated middleware

# Query Helper

A class wrote to ease querying and returning data for api process.
You can use it this way:

Import (I use this class in my controller) :

```ecmascript 6
import QueryHelper from "../helpers/queryHelper";
```
Then use it:
```ecmascript 6

// create or update, body keys are your db names and if you have id so it updates otherwise creates a record
export function createOrUpdatModel(req, res) {
  const body = req.body;
  new QueryHelper(Model).createOrUpdate(body, res);
}
```
response in the api is like:
```json
{
    "type": "success",
    "message": "updated!",
    "data": {
        "id": 4,
        "name": "doctor3",
        "website": "www.doctor3.com",
        "address": "doctor3 address...",
        "phone_number": "+18882223",
        "email": "doctor3@gmail.com",
        "createdAt": "2019-07-25T17:15:17.000Z",
        "updatedAt": "2019-07-25T17:15:42.115Z"
    }
}
```
type = success or error
message = message of event
data = a json data structure if we needed data in our response
```ecmascript 6

// reads all model table contents
/**
 *
 * @param req
 * @param res
 */
export function readAllModel(req, res) {
  const relations = [
     { model: Model1},
     { model: Model2}
  ];
  new QueryHelper(Model).find(null, res,relations).all();
}
```
```ecmascript 6

// reads all model table contents by pagination use page and pageSize in body to get the data
/**
 * req.body: {page,pageSize}
 * @param req
 * @param res
 */
export function readPaginatedModel(req, res) {
  const body = req.body;
  const relations = [
    { model: Model1},
    { model: Model2}
  ];
  new QueryHelper(Model).find(body, res,relations).paginated();
}
```
```ecmascript 6

// reads all model table contents by condition use where key in body to get the data
/**
 * req.body: {where}
 * @param req
 * @param res
 */
export function readConditionalModel(req, res) {
  const body = req.body;
  const relations = [
    { model: Model1},
    { model: Model2}
  ];
  new QueryHelper(Model).find(body, res,relations).conditional();
}
```
Example of where in request body:
```json
{
	"where":{"id":{"$or":[2,3]} }
}

```
Or
```json
{
	"where":{"id":2, "name" : "doctor"}
}
```
For Operators you can read in this link:
https://sequelize.readthedocs.io/en/latest/docs/querying/#operators

So you can query whatever you want in your request

```ecmascript 6
// read one 
/**
 * req.body: Doctor
 * @param req
 * @param res
 */
export function readOneModel(req, res) {
  const body = req.body;
  const relations = [
     { model: Model1},
     { model: Model2}
  ];
  new QueryHelper(Model).find(body, res,relations).one();
}

// delete conditional

/**
 * req.body: {where}
 * @param req
 * @param res
 */
export function deleteConditionalModel(req, res) {
  const condition = req.body.where;
  new QueryHelper(Model).delete(condition, res);
}

// create

export function createModel(req, res) {
  const body = req.body;
  new QueryHelper(Model).create(body, res);
}

// create without response

export function createWithoutResponseModel(req, res) {
  const body = req.body;
  new QueryHelper(Model).createWithoutResponse(body, res);
}


// update

export function updateModel(req, res) {
  const body = req.body;
  new QueryHelper(Model).update(body, res);
}

```
