const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/checkCredentials', (req, res) => {
  const { email, password } = req.body;
  let validationErrors = null;
  
  User.findByEmail(email)
    .then((user) => {
      validationErrors = User.validateConnexionBody(req.body);
      if (validationErrors) {
        return Promise.reject('INVALID_DATA');
      }
      console.log("user =>", user)
      if (user) {
        User.verifyPassword(password, user.hashedPassword)
          .then(validated => {
            if (validated) {
              delete user.hashedPassword
              return res.status(200).json({ user: user })
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

module.exports = usersRouter;