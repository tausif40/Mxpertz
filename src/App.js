import './App.css';
import { Route, Routes } from "react-router-dom";
import Design1 from './component/Design-1/Design1';
import Design2 from './component/Design-2/Design2';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Design1 />}></Route>
        <Route path="/cartDetails/:_id" element={<Design2 />}></Route>
      </Routes>
    
    </>
  );
}

export default App;
