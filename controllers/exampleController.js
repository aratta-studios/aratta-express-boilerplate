import {User, Example} from '../models';
import bcrypt from "bcrypt";
import {jwtAuthenticate} from "../auth";
import QueryHelper from "../helpers/queryHelper";

export function login(req, res) {
  jwtAuthenticate({
    username: req.body.user_name,
    password: req.body.password,
    usersTable: 'users',
    usernameField: "user_name",
    passwordField: 'password',
  },res);
}

export function signup(req, res) {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    console.log(req.body.password);
    User.create({user_name: req.body.user_name, password: hash}).then(user => res.status(200).json({
      type: 'success',
      message: 'Signed up!',
      data: user
    }));
  });
}

export function createUser(req, res) {
  new QueryHelper(User).create(req.body,res);
}

export function getUsers(req, res) {
  new QueryHelper(User).find(req.body,res).all();
}

export function createExample(req, res) {
  new QueryHelper(Example).create(req.body,res);
}

export function getExamples(req, res) {
  new QueryHelper(Example).find(req.body,res).all();
}
