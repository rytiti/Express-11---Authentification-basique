const User = require('../models/user');

User.hashPassword('myPlainPassword').then((hashedPassword) => {
  console.log(hashedPassword);
  console.log(hashedPassword.length)
  User.verifyPassword(
    'myPlainPassword',
    hashedPassword
   ).then((passwordIsCorrect) => {
     console.log(passwordIsCorrect);
   });
});




