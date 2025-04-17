import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import eyeOpen from "../assets/eye_on.png";
import eyeClosed from "../assets/eye_off.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validate = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "password") {
        // Store the username and photo in localStorage
        const userData = {
          username: "Admin",
          photo: "https://i.pravatar.cc/150?u=admin"  // Random user avatar
        };
        localStorage.setItem("user", JSON.stringify(userData));

        navigate("/weather");
      } else {
        setError("Invalid Credentials. Try again!");
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <section>
      <div className="signin">
        <div className="content">
          <h2>Sign In</h2>
          <br></br>
          <br></br>
          <form className="form" onSubmit={validate}>
            <div className="inputBox">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </div>

            <div className="inputBox">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
              <span id="passs" onClick={togglePasswordVisibility}>
                <img
                  src={showPassword ? eyeOpen : eyeClosed}
                  alt="Toggle Password"
                  id="eye"
                />
              </span>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="links">
              <a href="#">Forgot Password?</a>
              <a href="/signup">Signup</a>
            </div>

            <div className="inputBox">
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
