import "./index.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../shared/context/auth.context";

const Auth = () => {
  const auth = useContext(AuthContext);
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

  const handleChangeView = () => {
    setToggleValue(!toggleValue);
    let newRegisterObject = { name: "", email: "", password: "" };
    setRegisterValues(newRegisterObject);
    let newLoginObject = { email: "", password: "" };
    setLoginValues(newLoginObject);
    setIsFocusedFirst(false);
    setIsFocusedSecond(false);
    setIsFocusedThird(false);
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
      setIsFocusedSecond(false);
    }
  };

  const handleSubmit = (value: string) => {
    switch (value) {
      case "registration":
        console.log(registerValues);
        break;
      case "login":
        console.log(loginValues);
        break;
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth-container">
          {!toggleValue ? (
            <form onSubmit={() => handleSubmit("registration")}>
              <div
                className={`input-container ${isFocusedFirst ? "focused" : ""}`}
              >
                <label className="input-label">이름</label>
                <input
                  type="text"
                  value={registerValues.name}
                  onFocus={() => handleFocus(1)}
                  onBlur={(e) => handleBlur(e, 1)}
                  onChange={(e) => {
                    setRegisterValues({
                      ...registerValues,
                      name: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`input-container ${
                  isFocusedSecond ? "focused" : ""
                }`}
              >
                <label className="input-label">이메일</label>
                <input
                  type="email"
                  value={registerValues.email}
                  onFocus={() => handleFocus(2)}
                  onBlur={(e) => handleBlur(e, 2)}
                  onChange={(e) => {
                    setRegisterValues({
                      ...registerValues,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`input-container ${isFocusedThird ? "focused" : ""}`}
              >
                <label className="input-label">비밀번호</label>
                <input
                  type="password"
                  value={registerValues.password}
                  onFocus={() => handleFocus(3)}
                  onBlur={(e) => handleBlur(e, 3)}
                  onChange={(e) => {
                    setRegisterValues({
                      ...registerValues,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <button>회원가입</button>
            </form>
          ) : (
            <form onSubmit={() => handleSubmit("login")}>
              <div
                className={`input-container ${
                  isFocusedSecond ? "focused" : ""
                }`}
              >
                <label className="input-label">이메일</label>
                <input
                  type="email"
                  value={loginValues.email}
                  onFocus={() => handleFocus(2)}
                  onBlur={(e) => handleBlur(e, 2)}
                  onChange={(e) => {
                    setLoginValues({
                      ...registerValues,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div
                className={`input-container ${isFocusedThird ? "focused" : ""}`}
              >
                <label className="input-label">비밀번호</label>
                <input
                  type="password"
                  value={loginValues.password}
                  onFocus={() => handleFocus(3)}
                  onBlur={(e) => handleBlur(e, 3)}
                  onChange={(e) => {
                    setLoginValues({
                      ...registerValues,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
              <button>로그인</button>
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
