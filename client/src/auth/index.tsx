import "./index.scss";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/context/auth.context";
import { signUp } from "../api/signup";
import { logIn } from "../api/login";

const Auth = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

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
    signUpValues.email && setIsFocusedFirst(true);
    signUpValues.password && setIsFocusedSecond(true);
    signUpValues.name && setIsFocusedThird(true);
    loginValues.email && setIsFocusedFirst(true);
    loginValues.password && setIsFocusedSecond(true);
  }, [
    loginValues.email,
    loginValues.password,
    signUpValues.email,
    signUpValues.password,
    signUpValues.name,
  ]);

  const handleChangeView = () => {
    setToggleValue(!toggleValue);
    setLoginValues((prev) => {
      return {
        ...prev,
        email: signUpValues.email,
        password: signUpValues.password,
      };
    });
  };

  const [isFocusedFirst, setIsFocusedFirst] = useState(false);
  const [isFocusedSecond, setIsFocusedSecond] = useState(false);
  const [isFocusedThird, setIsFocusedThird] = useState(false);

  const handleFocus = (value: number) => {
    switch (value) {
      case 1:
        setIsFocusedFirst(true);
        break;
      case 2:
        setIsFocusedSecond(true);
        break;
      case 3:
        setIsFocusedThird(true);
        break;
    }
  };

  const handleBlur = (event: any, val: number) => {
    if (!event.target.value && val === 1) {
      setIsFocusedFirst(false);
    }
    if (!event.target.value && val === 2) {
      setIsFocusedSecond(false);
    }
    if (!event.target.value && val === 3) {
      setIsFocusedThird(false);
    }
  };

  const handleSubmit = async (e: any, value: string) => {
    e.preventDefault();
    switch (value) {
      case "sign-up":
        const signUpResponse = await signUp(signUpValues);
        if (signUpResponse.success) {
          setIsFocusedSecond(false);
          setIsFocusedThird(false);
          setToggleValue(!toggleValue);
        }
        break;
      case "login":
        const logInResponse = await logIn(loginValues);
        if (logInResponse?.status === 200) {
          auth.login(logInResponse.data.userId, logInResponse.data.token);
          history.push("/memory");
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
              <div
                className={`input-container ${isFocusedFirst ? "focused" : ""}`}
              >
                <label className="input-label">이메일</label>
                <input
                  id="email"
                  type="email"
                  className="auth-input"
                  value={signUpValues.email}
                  onFocus={() => handleFocus(1)}
                  onBlur={(e) => handleBlur(e, 1)}
                  onChange={(e) => {
                    setSignUpValues({
                      ...signUpValues,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`input-container ${
                  isFocusedSecond ? "focused" : ""
                }`}
              >
                <label className="input-label">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  className="auth-input"
                  value={signUpValues.password}
                  onFocus={() => handleFocus(2)}
                  onBlur={(e) => handleBlur(e, 2)}
                  onChange={(e) => {
                    setSignUpValues({
                      ...signUpValues,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`input-container ${isFocusedThird ? "focused" : ""}`}
              >
                <label className="input-label">이름</label>
                <input
                  id="name"
                  type="text"
                  className="auth-input"
                  value={signUpValues.name}
                  onFocus={() => handleFocus(3)}
                  onBlur={(e) => handleBlur(e, 3)}
                  onChange={(e) => {
                    setSignUpValues({
                      ...signUpValues,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <button className="btn-registration">회원가입</button>
            </form>
          ) : (
            <form onSubmit={(e) => handleSubmit(e, "login")}>
              <div
                className={`input-container ${isFocusedFirst ? "focused" : ""}`}
              >
                <label className="input-label">이메일</label>
                <input
                  id="email"
                  type="email"
                  className="auth-input"
                  value={loginValues.email}
                  onFocus={() => handleFocus(1)}
                  onBlur={(e) => handleBlur(e, 1)}
                  onChange={(e) => {
                    setLoginValues({
                      ...loginValues,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`input-container ${
                  isFocusedSecond ? "focused" : ""
                }`}
              >
                <label className="input-label">비밀번호</label>
                <input
                  id="password"
                  type="password"
                  className="auth-input"
                  value={loginValues.password}
                  onFocus={() => handleFocus(2)}
                  onBlur={(e) => handleBlur(e, 2)}
                  onChange={(e) => {
                    setLoginValues({
                      ...loginValues,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
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
