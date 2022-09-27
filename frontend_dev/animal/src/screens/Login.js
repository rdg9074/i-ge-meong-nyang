import "./Login.css";
import React from "react";

function Login() {
  return (
    <div id="login">
      <div className="wrapper text-center">
        <div className="header">
          <div className="header__intro">
            <img className="header__img" src="./MainDog.svg" alt="icon" />
            <p className="header__name">이게멍냥</p>
          </div>
          <p className="header__title">
            반가워요!
            <br />
            이게멍냥입니다.
          </p>
        </div>
        <div className="content">
          <div className="line"></div>
          <p className="header__mention">SNS로 간편하게 시작하기</p>
          <img src='/kakao_login.png' id='loginBtn' onClick={()=>{
            // 카카오 로그인 연결
          }}></img><br></br>
          <img src='/naver_login.png' id='loginBtn' onClick={()=>{
            // 네이버 로그인 연결
          }}></img>

          {/* <section className="social-login">
            <button type="button" className="social-login__btn-kakao">
              <img
                className="btn__img-kakao"
                src="./kakao_login.png"
                alt="kakaoimg"
              />
            </button>
            <button type="button" className="social-login__btn-naver">
              <img
                className="btn__img-naver"
                src="./naver_login.png"
                alt="naverimg"
              />
            </button>
          </section> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
