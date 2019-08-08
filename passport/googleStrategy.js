const GoogleStrategy = require('passport-google').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new GoogleStrategy({

    }, async (accessTocken,refreshTocken,profile,done) => {
        try{
            const exUser = await User.find({ where: { snsId: profile.id, provider:'google' }});
            if(exUser){
                done(null,exUser);
            } else {
                done(null,);
            }
        } catch (e) {
            console.error(error);
            done(error);
        }

    }));
}