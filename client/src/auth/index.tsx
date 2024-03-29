import "./index.scss";
import { useHistory } from "react-router-dom";
import {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  Suspense,
} from "react";
import { AuthContext } from "../shared/context/auth.context";
import { signUp } from "../api/signup";
import { logIn } from "../api/login";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../utils/validation";
import Modal from "../shared/components/Modal";
import { Canvas, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useProgress } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

function Model(props: any) {
  const gltf = useLoader(
    GLTFLoader,
    "https://memorystrike.s3.ap-northeast-2.amazonaws.com/memory_strike_brain.glb"
  );

  return (
    <mesh {...props}>
      <primitive scale={0.002} object={gltf.scene} />
    </mesh>
  );
}

const Loader = ({ loader, setLoader }: any) => {
  const { active, progress } = useProgress();

  useEffect(() => {
    setLoader(true);
    if (progress === 100) {
      setLoader(false);
    }
  }, [active, progress, setLoader]);

  return <>{loader}</>;
};

const Auth = () => {
  const [loader, setLoader] = useState<boolean>(false);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState<string>("");
  const emailInputEl = useRef<HTMLInputElement>(null);
  const passwordInputEl = useRef<HTMLInputElement>(null);
  const nameInputEl = useRef<HTMLInputElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

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
            setShowModal(!showModal);
          }
        } else {
          setError("모든 항목들을 채워주세요.");
          setShowModal(!showModal);
        }
        break;
      case "login":
        if (
          emailValidation(loginValues.email) &&
          passwordValidation(loginValues.password)
        ) {
          res = await logIn(loginValues);
          // res 값 확인
          console.log(res);
          if (res.status === 200) {
            auth.login(res.data.userId, res.data.token);
            history.push("/memory");
          } else {
            setError(res);
            setShowModal(!showModal);
          }
        } else {
          setError("모든 항목들을 채워주세요.");
          setShowModal(!showModal);
        }
        break;
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth-title">
          <h1 className="auth-title-main">Memory Strike</h1>
          <p className="auth-title-sub">복습 · 셀프 테스팅을 위한 웹 서비스</p>
        </div>

        {loader && <span className="loader"></span>}
        <div className="auth-brain">
          <Canvas flat>
            <orthographicCamera position={[0, 0, 0]} />
            <OrbitControls
              enableZoom={false}
              rotateSpeed={2}
              autoRotate={true}
              autoRotateSpeed={5}
            />
            <ambientLight />
            <spotLight position={[0, 10, 0]} angle={1} />
            <Suspense fallback={null}>
              <Model position={[0, -3, 2]} rotation={[-1, 0, 0]} />
            </Suspense>
            <Loader loader={loader} setLoader={setLoader} />
          </Canvas>
        </div>

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
              </div>
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
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          message={error}
        />
      )}
    </>
  );
};

export default Auth;
