import env from "../env";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mysql from 'mysql';


/**
 * this function checks if user entered correct username and password returns token in the header if it's correct
 * @param username
 * @param password
 * @param usersTable
 * @param usernameField
 * @param passwordField
 * @param res
 */
export function jwtAuthenticate({username, password, usersTable, usernameField, passwordField}, res) {
  const db = mysql.createConnection({user: env.username, password: env.password, database: env.database});

  db.query('select * from `' + usersTable + '` where `' + usernameField + '`=?', username, (error, results) => {
    if (error) return res.status(500).json({type: 'error', message: 'db error', error});
    if (results.length === 0) return res.status(403).json({
      type: 'error',
      message: 'User with provided email not found in database.'
    });
    const user = results[0];
    bcrypt.compare(password, user.password, (error, result) => {
      if (error) return res.status(500).json({type: 'error', message: 'bcrypt error', error});
      if (result) {
        res.status(200).header('Authorization', 'Bearer ' + jwt.sign({
          id: user.id,
          email: user.email
        }, env.jwtSecret)).json({
          type: 'success',
          message: 'User logged in.',
          user
        })
      } else res.status(403).json({type: 'error', message: 'Password is incorrect.'});
    })
  })
}

/**
 * this middleware checks if controller receives correct jwt token in header in authorization field
 * @param req
 * @param res
 * @param next
 * @returns {any | Promise<any>}
 */
export function isJwtAuthenticated(req, res, next) {
  // do any checks you want to in here

  let token = req.headers.authorization;

  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  } else {
    return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error: null});
  }

  if (token) {
    jwt.verify(token, env.jwtSecret, (error, result) => {
      if (!error)
        req.userId = result.id;
      return next();

      return res.status(403).json({type: 'error', message: 'Provided token is invalid.', error});
    })
  } else {
    return res.status(403).json({type: 'error', message: 'Token is not provided.', error: null});
  }
}

