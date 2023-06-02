import "./index.scss";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { AuthContext } from "../shared/context/auth.context";
import { signUp } from "../api/signup";
import { logIn } from "../api/login";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../api/utils/validation";

const Auth = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState<string>("");
  const emailInputEl = useRef<HTMLInputElement>(null);
  const passwordInputEl = useRef<HTMLInputElement>(null);
  const nameInputEl = useRef<HTMLInputElement>(null);

  const [toggleValue, setToggleValue] = useState<boolean>(false);
  const [signUpValues, setSignUpValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    setError("");
  }, [toggleValue]);

  const handleChangeView = useCallback(() => {
    if (loginValues) {
      setLoginValues((prev) => {
        return {
          ...prev,
          email: "",
          password: "",
        };
      });
    }
    if (signUpValues) {
      setSignUpValues((prev) => {
        return {
          ...prev,
          name: "",
          email: "",
          password: "",
        };
      });
    }
    setToggleValue(!toggleValue);
  }, [toggleValue]);

  const handleSubmit = async (e: any, value: string) => {
    e.preventDefault();
    let res;

    switch (value) {
      case "sign-up":
        if (
          emailValidation(signUpValues.email) &&
          passwordValidation(signUpValues.password) &&
          nameValidation(signUpValues.name)
        ) {
          res = await signUp(signUpValues);
          if (res.status === 201) {
            setToggleValue(!toggleValue);
          } else {
            setError(res);
          }
        } else {
          //TODO : 모달
          alert("모든 항목들을 채워주세요.");
        }
        break;
      case "login":
        if (
          emailValidation(loginValues.email) &&
          passwordValidation(loginValues.password)
        ) {
          res = await logIn(loginValues);
          if (res.status === 200) {
            auth.login(res.data.userId, res.data.token);
            history.push("/memory");
          } else {
            setError(res);
          }
        } else {
          //TODO : 모달
          alert("모든 항목들을 채워주세요.");
        }
        break;
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth-container">
          {!toggleValue ? (
            <form onSubmit={(e) => handleSubmit(e, "sign-up")}>
              <div className="input-container">
                <input
                  ref={emailInputEl}
                  id="email"
                  type="email"
                  className="auth-input"
                  placeholder="이메일"
                  value={signUpValues.email}
                  onChange={(e) => {
                    emailValidation(signUpValues.email);
                    setSignUpValues({
                      ...signUpValues,
                      email: e.target.value,
                    });
                  }}
                />
                <span className="input-container-error">
                  {!emailValidation(signUpValues.email) &&
                  signUpValues.email !== "" ? (
                    <>
                      <p>이메일 형식을 지켜주세요</p>
                      {emailInputEl.current?.classList.add(
                        "auth-input-outline"
                      )}
                    </>
                  ) : (
                    <>
                      {emailInputEl.current?.classList.remove(
                        "auth-input-outline"
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="input-container">
                <input
                  ref={passwordInputEl}
                  id="password"
                  type="password"
                  className="auth-input"
                  placeholder="비밀번호"
                  value={signUpValues.password}
                  onChange={(e) => {
                    passwordValidation(signUpValues.password);
                    setSignUpValues({
                      ...signUpValues,
                      password: e.target.value,
                    });
                  }}
                />
                <span className="input-container-error">
                  {!passwordValidation(signUpValues.password) &&
                  signUpValues.password !== "" ? (
                    <>
                      <p>
                        비밀번호는 숫자,문자,특수문자 포함 형태의 8~15자리여야
                        합니다.
                      </p>
                      {passwordInputEl.current?.classList.add(
                        "auth-input-outline"
                      )}
                    </>
                  ) : (
                    <>
                      {passwordInputEl.current?.classList.remove(
                        "auth-input-outline"
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="input-container">
                <input
                  ref={nameInputEl}
                  id="name"
                  type="text"
                  className="auth-input"
                  value={signUpValues.name}
                  placeholder="이름"
                  onChange={(e) => {
                    nameValidation(signUpValues.name);
                    setSignUpValues({
                      ...signUpValues,
                      name: e.target.value,
                    });
                  }}
                />
                <span className="input-container-error">
                  {/* {nameValidation(signUpValues.name) ? (
                    <>
                      <p>이름을 작성해주세요.</p>
                      {nameInputEl.current?.classList.add("auth-input-outline")}
                    </>
                  ) : (
                    <>
                      {nameInputEl.current?.classList.remove(
                        "auth-input-outline"
                      )}
                    </>
                  )} */}
                </span>
              </div>
              <p className="input-container-error">{error ? error : ""}</p>
              <button className="btn-registration">회원가입</button>
            </form>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, "login")}>
              <div className="input-container">
                <input
                  ref={emailInputEl}
                  id="email"
                  type="email"
                  className="auth-input"
                  placeholder="이메일"
                  value={loginValues.email}
                  onChange={(e) => {
                    emailValidation(loginValues.email);
                    setLoginValues({
                      ...loginValues,
                      email: e.target.value,
                    });
                  }}
                />
                <span className="input-container-error">
                  {!emailValidation(loginValues.email) &&
                  loginValues.email !== "" ? (
                    <>
                      <p>이메일 형식을 지켜주세요</p>
                      {emailInputEl.current?.classList.add(
                        "auth-input-outline"
                      )}
                    </>
                  ) : (
                    <>
                      {emailInputEl.current?.classList.remove(
                        "auth-input-outline"
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="input-container">
                <input
                  ref={passwordInputEl}
                  id="password"
                  type="password"
                  className="auth-input"
                  placeholder="비밀번호"
                  value={loginValues.password}
                  onChange={(e) => {
                    passwordValidation(loginValues.password);
                    setLoginValues({
                      ...loginValues,
                      password: e.target.value,
                    });
                  }}
                />
                <span className="input-container-error">
                  {!passwordValidation(loginValues.password) &&
                  loginValues.password !== "" ? (
                    <>
                      <p>
                        비밀번호는 숫자,문자,특수문자 포함 형태의 8~15자리여야
                        합니다.
                      </p>
                      {passwordInputEl.current?.classList.add(
                        "auth-input-outline"
                      )}
                    </>
                  ) : (
                    <>
                      {passwordInputEl.current?.classList.remove(
                        "auth-input-outline"
                      )}
                    </>
                  )}
                </span>
              </div>
              <p className="input-container-error">{error ? error : ""}</p>
              <button className="btn-registration">로그인</button>
            </form>
          )}
          <span
            className="auth-container-view-toggle"
            onClick={handleChangeView}
          >
            {toggleValue ? "가입하기" : "로그인하기"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Auth;
