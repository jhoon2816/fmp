const KakaoStrategy = require('passport-kakao').Strategy;

const {User} = require('../models');

module.exports = (passport) => {
    passport.use(new KakaoStrategy({
        clientD: process.env.KAKAO_ID,
        callback: '/auth/kakao/callback',
    }, async (accessToken, refreshTocken, profile, done) => {
        try{
            const exUser = await User.find({where:{ snsId: profile.id, provider:'kakao'}});
            if(exUser) {
                done(null, exUser);
            } else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null,newUser);
            }
        } catch (e) {
            console.error(error);
            done(error)
        }
    }));
};