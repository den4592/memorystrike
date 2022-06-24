export const Topics = ({ topics, handleDelete }) => {
  return (
    <ul className="topics">
      {topics.map((topic) => {
        return (
          <li className="topic d-flex" key={topic.id}>
            <div className="topic-container d-flex topic-item">
              <span className="span-text">Topic:</span>
              <p className="topic-text">{topic.topic}</p>
            </div>
            <div className="answer-container d-flex topic-item">
              <span className="span-text">Answer:</span>
              <p className="topic-answer-text">{topic.answer}</p>
            </div>
            <i className="fa-solid fa-trash-can remove-topic topic-item" onClick={() => handleDelete(topic.id)} />
          </li>
        );
      })}
    </ul>
  );
};
