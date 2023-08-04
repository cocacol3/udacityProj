import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./Pages/Search";
import Home from "./Pages/Home";
import "./App.css";
import AppProvider from "./ContextApi/AppContext";

function App() {
  return (
    <div>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {['', 'home'].map((path, index) => <Route path={path} element={<Home />} key={index} />)}
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </div>
  );
}

export default App;
