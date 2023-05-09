import "./index.scss";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../shared/context/auth.context";
import axios from "axios";

const Auth = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [token, setToken] = useState("");
  const [toggleValue, setToggleValue] = useState<boolean>(false);
  const [registerValues, setRegisterValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    registerValues.email && setIsFocusedFirst(true);
    registerValues.password && setIsFocusedSecond(true);
    registerValues.name && setIsFocusedThird(true);
    loginValues.email && setIsFocusedFirst(true);
    loginValues.password && setIsFocusedSecond(true);
  }, [
    registerValues.email,
    registerValues.name,
    registerValues.password,
    loginValues.email,
    loginValues.password,
  ]);

  const handleChangeView = () => {
    setToggleValue(!toggleValue);
    setLoginValues((prev) => {
      return {
        ...prev,
        email: registerValues.email,
        password: registerValues.password,
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

  const handleSubmit = (e: any, value: string) => {
    e.preventDefault();
    switch (value) {
      case "registration":
        console.log(registerValues);
        axios
          .post("http://localhost:8080/api/user/signup", {
            name: registerValues.name,
            email: registerValues.email,
            password: registerValues.password,
          })
          .then(function (response) {
            if (response.status === 201) {
              setIsFocusedSecond(false);
              setIsFocusedThird(false);
              setToggleValue(!toggleValue);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        break;
      case "login":
        console.log(loginValues);
        axios
          .post("http://localhost:8080/api/user/login", {
            email: loginValues.email,
            password: loginValues.password,
          })
          .then(function (response) {
            console.log(response);
            if (response.status === 200) {
              window.localStorage.setItem("token", response.data.token);
              history.push("/memory");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        break;
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth-container">
          {!toggleValue ? (
            <form onSubmit={(e) => handleSubmit(e, "registration")}>
              <div
                className={`input-container ${isFocusedFirst ? "focused" : ""}`}
              >
                <label className="input-label">이메일</label>
                <input
                  id="email"
                  type="email"
                  className="auth-input"
                  value={registerValues.email}
                  onFocus={() => handleFocus(1)}
                  onBlur={(e) => handleBlur(e, 1)}
                  onChange={(e) => {
                    setRegisterValues({
                      ...registerValues,
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
                  value={registerValues.password}
                  onFocus={() => handleFocus(2)}
                  onBlur={(e) => handleBlur(e, 2)}
                  onChange={(e) => {
                    setRegisterValues({
                      ...registerValues,
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
                  value={registerValues.name}
                  onFocus={() => handleFocus(3)}
                  onBlur={(e) => handleBlur(e, 3)}
                  onChange={(e) => {
                    setRegisterValues({
                      ...registerValues,
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
          <span onClick={handleChangeView}>
            {toggleValue ? "가입하기" : "로그인하기"}
          </span>
        </div>
      </div>
    </>
  );
};

export default Auth;
