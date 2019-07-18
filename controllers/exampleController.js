import {User, Example} from '../models';
import bcrypt from "bcrypt";
import {jwtAuthenticate} from "../auth";

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
  User.create(req.body).then(user => res.json({type: 'success', message: 'Test OK', data: user}));
}

export function getUsers(req, res) {
  User.findAll().then(user => res.json({type: 'success', message: 'Test OK', data: user,myUserId:req.userId}));
}

export function createExample(req, res) {
  Example.create(req.body).then(example => res.json({type: 'success', message: 'Test OK', data: example}));
}

export function getExamples(req, res) {
  Example.findAll().then(example => res.json({type: 'success', message: 'Test OK', data: example}));
}
