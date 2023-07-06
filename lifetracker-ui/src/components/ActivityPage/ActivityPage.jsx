// import "./ActivityPage.css";


// export default function Activity() {
//   return (
//     <div className="ActivityPage">
//         <h1>Login to see your activity data.</h1>
      
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import "./ActivityPage.css";

export default function Activity({ isLoggedIn }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      setMessage("You are logged in. Here is your activity data.");
    } else {
      setMessage("Login to see your activity data.");
    }
  }, [isLoggedIn]);

  return (
    <div className="ActivityPage">
      <h1>{message}</h1>
    </div>
  );
}
