const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
// const google = require('./googleStrategy');

const { User } = require('../models');

module.exports = (passport) => {
    passport.serializeUser((user,done)=>{
       done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
       User.find({ where: { id } })
           .then(user => done(null,user))
           .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
};

// serializeUser 은 req.session 에 어떤 데이터를 저장할지 선택합니다. 매개변수로 user 받고 done함수에 두번째 인자로 user.id를 넘김
// done함수의 첫번째 인자는
// deserializeUser는 매 요청시 실행됩니다. passport.session() 미들웨어가 이 메서드를 호출
// serializeUser에서 세션에 저장한 데이터를 받아 데이터베이스에서 사용자 정보를 검색
// 조회한 정보를 req.user에 저장하므로 그 뒤로는 req.user를 통해 로그인한 사용자의 정보를 가져올수있습니다.
