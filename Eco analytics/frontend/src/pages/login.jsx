import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    await login(dispatch, { username, password });
    history.push("/dashboard"); 
  };

  return (
    <div>
      <h1>SIGN IN</h1>
      <form>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          disabled={isFetching}
        >
          LOGIN
        </button>
        {error && <span>Something went wrong...</span>}
      </form>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { login } from "../redux/apiCalls";

// const Login = ({ authenticateUser }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();

//   const handleClick = async (e) => {
//     e.preventDefault();
//     const success = await login(dispatch, { username, password });
//     if (success) {
//       authenticateUser();
//     }
//   };

//   return (
//     <div>
//       <h1>SIGN IN</h1>
//       <form>
//         <input
//           placeholder="username"
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           placeholder="password"
//           type="password"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleClick}>LOGIN</button>
//       </form>
//     </div>
//   );
// };

// export default Login;

