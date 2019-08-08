const GoogleStrategy = require('passport-google').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({

    }, async (accessTocken,refreshTocken,profile,done) => {
        try{
            const exUser = await ()
            if()
        } catch (e) {
            console.error(error);
            done(error);
        }

    }));
}