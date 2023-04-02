import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import TopRated from "./components/TopRated";
import NowPlaying from "./components/NowPlaying";
import UpComing from "./components/UpComing";
import Home from "./components/Home";


function App() {
 
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/top-rated" element={<TopRated />} />
        <Route path="/now-playing" element={<NowPlaying />} />
        <Route path="/upcoming" element={<UpComing />} />
      </Routes>
  );
}

export default App;