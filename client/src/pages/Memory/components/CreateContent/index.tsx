import "./index.scss";
import { useHistory } from "react-router-dom";

const CreateContent = () => {
  const history = useHistory();

  return (
    <div>
      123
      <button onClick={history.goBack}>Back</button>
    </div>
  );
};

export default CreateContent;
