const { Strategy } = require("passport-local");
const bcrypt = require("bcryptjs");

// load user model
const userModel = require('../src/models/Users');

module.export = (passport) => {
  passport.use(new Strategy({usernameField : 'email'}, async (email, password, done)=>{
    const user = await userModel.getUserByEmail(email);
    if(!user) return done(null, false); //user does not exist make err msg vague

    bcrypt.compare(password, user.password, (err, isMatch) => {

      if(err) throw err;

      if(isMatch) {
        return done(null, user);
      } else {
        //incorrect password but make the error msg vague
        return done(null, false);
      }

    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userModel.getUser(id);
    done(err, user);
  })
}
