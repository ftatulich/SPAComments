import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from "./сomponents/Home";
import PostDetails from "./сomponents/PostDetails";


function App() {
  return (
      <Router>
          <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/posts/:id/" element={<PostDetails/>} />
          </Routes>
      </Router>
  );
}

export default App;
