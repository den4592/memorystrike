import { useEffect, useState, useRef } from "react";
import { Topics } from "./Topics";
import useDidMountEffect from "./useDidMountEffect";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Rights } from "./Rights";
import { Header } from "./Header";

export const Form = () => {
  const [topics, setTopics] = useState([]);
  const [topicsId, setTopicsId] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [textAreaIsDisabled, setTextAreaIsDisabled] = useState(true);
  const [topic, setTopic] = useState("");
  const [answer, setAnswer] = useState("");
  const countRef = useRef(0);
  const [topicsCount, setTopicsCount] = useState(0);

  const inputText = document.querySelector("input");
  const answerText = document.querySelector(".answer-text");

  useEffect(() => {
    setTopicsCount(topics.length);
    if (localStorage.length > 0) {
      setIsDisabled(false);
      let lstorageItems = localStorage.getItem("topics");
      let parsedItems = JSON.parse(lstorageItems);
      localStorage.setItem("topics", JSON.stringify(parsedItems));
      setTopics(parsedItems);
    }
  }, []);

  useDidMountEffect(() => {
    setTopicsCount(topics.length);
    if (topics.length > 0) {
      document.querySelector(".reset-btn").classList.add("enabled");
      document.querySelector(".mix-btn").classList.add("enabled");
      localStorage.setItem("topics", JSON.stringify(topics));
    } else {
      document.querySelector(".reset-btn").classList.remove("enabled");
      document.querySelector(".mix-btn").classList.remove("enabled");
    }
  }, [topics]);

  const handleChange = (e) => {
    if (e.target.value === "answer-o") {
      setTextAreaIsDisabled(!textAreaIsDisabled);
      document.querySelector(".answer-text").classList.add("on");
      document.querySelector(".answer-text").classList.remove("off");
    } else {
      setTextAreaIsDisabled(true);
      document.querySelector(".answer-text").classList.add("off");
      document.querySelector(".answer-text").classList.remove("on");
    }
  };

  const Reset = () => {
    if (inputText && answerText) {
      inputText.value = "";
      answerText.value = "";
    }
    document.querySelector("select").value = "answer-x";
    setTopicsId(0);
    setTopics([]);
    setTopic("");
    setAnswer("");
    setIsDisabled(true);
    localStorage.clear();
    setTopicsCount(0);
  };

  const clearInput = () => {
    setTopic("");
    setAnswer("");
  };

  const Add = () => {
    if (topic && answer && localStorage.length >= 0) {
      inputText.value = "";
      answerText.value = "";
      setTopics((prevItems) => [
        ...prevItems,
        {
          topic: topic,
          answer: answer,
          id: uuidv4(),
        },
      ]);
      countRef.current += 1;
    } else if (inputText.value == "" || answerText.value == "") {
      alert("Topic과 Answer을 기재해주세요.");
    }
    clearInput();
  };

  const handleDelete = (id) => {
    const newTopic = topics.filter((topic) => topic.id !== id);
    if (localStorage.length === 1) {
      localStorage.clear();
    }
    setTopics(newTopic);
  };

  return (
    <div className="first-page">
      <Header />
      <section className="section1 section">
        <div className="d-flex">
          <div className="main-container">
            <h1 className="title">복습할 Topic을 추가해주세요</h1>
            <div className="form">
              <input
                type="text"
                placeholder="Topic"
                onChange={(e) => {
                  setTopic(e.target.value);
                }}
              />
              <select onChange={handleChange}>
                <option value="answer-x">Answer x</option>
                <option value="answer-o">Answer o</option>
              </select>
              <textarea className="answer-text off" placeholder="Answer..." disabled={textAreaIsDisabled} onChange={(e) => setAnswer(e.target.value)}></textarea>
              <div className="buttons">
                <button className="add-btn enabled btn" onClick={Add}>
                  Add
                  <i className="fa-solid fa-plus"></i>
                </button>
                <div className="disabled-btns d-flex ">
                  <button className="reset-btn btn" disabled={isDisabled.value} onClick={Reset}>
                    Reset
                    <i className="fa-solid fa-rotate"></i>
                  </button>
                  {isDisabled ? (
                    <Link to="/random-topics" state={topics} onClick={(event) => event.preventDefault()} style={{ textDecoration: "none", marginTop: "1rem" }}>
                      <button type="button" className="mix-btn btn">
                        Mix
                        <i className="fa-solid fa-arrows-turn-right"></i>
                      </button>
                    </Link>
                  ) : (
                    <Link to="/random-topics" state={topics} style={{ textDecoration: "none", marginTop: "1rem" }}>
                      <button type="button" className="mix-btn btn">
                        Mix
                        <i className="fa-solid fa-arrows-turn-right"></i>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <h1 className="topics-count">Topics Count : {topicsCount}</h1>
          </div>
        </div>
      </section>

      <section className="section2 section">
        <div className="topics">
          <div className="container">
            <Topics topics={topics} handleDelete={handleDelete} />
          </div>
        </div>
      </section>
      <Rights />
    </div>
  );
};
