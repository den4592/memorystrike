import "./index.css";
import { Form } from "./Form";
import { RandomTopics } from "./RandomTopics";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Form />} />
          <Route exact path="/random-topics" element={<RandomTopics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
