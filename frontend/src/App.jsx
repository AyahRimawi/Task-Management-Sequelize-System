import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Task from "./Page/Task";

function App() {
  return (
    <>
      {/* <form action="http://localhost:5000/sendData" method="post">
        <input type="text" name="test" placeholder="some word" />
        <input type="text" name="numbur" placeholder="enter the id" />
        <input type="submit" value="send" />
      </form> */}
      {/* <Register />
      <Login /> */}
      {/* <Task /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Task" element={<Task />} />
      </Routes>
    </>
  );
}

export default App;
