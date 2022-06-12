const authRouter = require('express').Router();
const User = require('../models/user');
const { calculateToken } = require('../helpers/users');

authRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  let validationErrors = null;
  User.findByEmail(email)
    .then((user) => {
      validationErrors = User.validateConnexionBody(req.body);
      if (validationErrors) {
        return Promise.reject('INVALID_DATA');
      }
      if (user) {
        User.verifyPassword(password, user.hashedPassword)
          .then(validated => {
            if (validated) {
              delete user.hashedPassword
              let token = calculateToken(email)
              User.update(user.id, { token: token })
              res.cookie('user_token', token)
              res.send()
            } else {
              return res.status(401).send("Wrong password")
            }
          })
      }
      else res.status(404).send('User not found');
    })
    .catch((err) => {
      console.error(err);
      if (err === 'INVALID_DATA')
        res.status(422).json({ validationErrors });
      else res.status(500).send('Error retrieving user from database');
    });
})

module.exports = authRouter;