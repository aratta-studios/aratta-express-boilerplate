import {createExample, createUser, getExamples, getUsers, login, signup} from "../controllers/exampleController";
import {isJwtAuthenticated} from "../auth";

module.exports = function(app){

  app.post('/login', login);
  app.post('/signup', signup);
  app.post('/create-user', createUser);
  app.post('/get-users',isJwtAuthenticated, getUsers);
  app.post('/create-example',isJwtAuthenticated, createExample);
  app.post('/get-examples',isJwtAuthenticated, getExamples);

  //other routes..
};
