const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

const {User} = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernamefield : 'email',
        passwordfield : 'password'
    }, async (email, password, done)=>{
        try{
            const exUser = await User.find({where: {email}});
            if(exUser){
                const result = await bcrypt.compare(password,exUser.password);
                if(result){
                    done(null, exUser);
                } else{
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.'})
                }
            } else {
                done(null, false, { message: '가입되지 않는 사용자입니다.'});
            }
        } catch (e) {
            console.error(error);
            done(error)
        }
    }));
};
