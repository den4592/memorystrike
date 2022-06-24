import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Rights } from "./Rights";
import { Header } from "./Header";

export const RandomTopics = () => {
  const locations = useLocation();
  const data = locations.state;
  const [topicAnswer, setTopicAnswer] = useState("");
  let count = 0;
  data.forEach((item) => {
    item.id = count;
    count += 1;
  });
  //   console.log(data);
  let itemList = [];
  let array = [];
  let obj = {};
  let arr = [];

  const resetValues = () => {
    itemList = [];
    array = [];
    obj = {};
    arr = [];
  };

  //topics object to array
  for (let i = 0; i < data.length; i++) {
    array.push(data[i].topic);
    array.push(data[i].answer);
    array.push(data[i].id);
    itemList.push(array);
    array = [];
  }
  //   console.log(itemList);

  /* Randomize array in-place using Durstenfeld shuffle algorithm */
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };
  //랜덤으로 값을 보여주기 위해 배열을 섞는다
  itemList = shuffleArray(itemList);

  itemList.forEach((item) => {
    obj.topic = item[0];
    obj.answer = item[1];
    obj.id = item[2];
    arr.push(obj);
    obj = {};
  });
  //   console.log(itemList);

  const handleHide = (e) => {
    e.target.style.display = "none";
  };

  const handleToggle = (num) => {
    for (let i = 0; i < itemList.length; i++) {
      if (i === num) {
        if (document.querySelector(`.topic-answer-text${num}`).hasChildNodes()) {
          document.querySelector(`.topic-answer-text${num}`).classList.add("topic-answer-text");
          document.querySelector(`.topic-answer-text${num}`).firstElementChild.remove();
        } else if (document.querySelector(`.topic-answer-text${num}`).childNodes.length === 0) {
          var onSpan = document.createElement("span");
          onSpan.innerHTML = `${itemList[i][1]}`;
          document.querySelector(`.topic-answer-text${num}`).appendChild(onSpan);
        }
      }
    }
  };
  //textarea height resizing
  const tx = document.getElementsByTagName("textarea");
  for (let i = 0; i < tx.length; i++) {
    tx[i].setAttribute("style", "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;");
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  return (
    <section className="section3 section">
      <Header />
      <div className="container d-flex">
        <div className="random-topics">
          <Link to="/" onClick={resetValues}>
            <span className="back-btn enabled">
              <i className="fa-solid fa-angles-left"></i>
            </span>
          </Link>
          <ul className="mixed-items">
            {arr.map((item, index) => {
              return (
                <li key={item.id} className="topic mixed-item">
                  <div onClick={handleHide} className="covered-topic"></div>
                  <p className="topic-text">{item.topic}</p>
                  <textarea className="topic-textarea"></textarea>
                  <span className="toggle" onClick={() => handleToggle(index)} id={index}>
                    Answer
                  </span>
                  <p className={`topic-answer-text${index} topic-answer-text`} id={index}></p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <Rights />
    </section>
  );
};
