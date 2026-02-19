import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const demoEmail = "demo@gmail.com";
  const demoPassword = "demo@123";
  const [emailId, setEmailId] = useState(demoEmail);
  const [password, setPassword] = useState(demoPassword);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (emailId === demoEmail && password === demoPassword) {
      const user = {
        firstName: "Demo",
        lastName: "User",
        emailId: demoEmail,
        photoUrl: "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
      };
      dispatch(addUser(user));
      navigate("/");
    } else {
      alert("Invalid credentials. Use demo@gmail.com / demo@123");
    }
    setIsLoading(false);
  };

  const handleSignUp = () => {
    // For demo purposes, just show success message
    alert("Sign up successful! Please use demo@gmail.com / demo@123 to login.");
    setIsLoginForm(true);
    setFirstName("");
    setLastName("");
    setEmailId(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl border border-base-300">
        <div className="card-body">
          <div className="text-center mb-8">
            <h2 className="card-title justify-center text-2xl font-bold">
              {isLoginForm ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-base-content/70">
              {isLoginForm ? "Sign in to your account" : "Join our community"}
            </p>
          </div>

          <div className="space-y-4">
            {!isLoginForm && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">First Name</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered focus:input-primary transition-all duration-300 p-4 w-full"
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Last Name</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered focus:input-primary transition-all duration-300 p-4 w-full"
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                  />
                </div>
              </>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <input
                type="email"
                value={emailId}
                className="input input-bordered focus:input-primary transition-all duration-300 p-4 w-full"
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                value={password}
                className="input input-bordered focus:input-primary transition-all duration-300 p-4 w-full"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div className="card-actions justify-center mt-6">
            <button
              className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
              onClick={isLoginForm ? handleLogin : handleSignUp}
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : (isLoginForm ? "Sign In" : "Create Account")}
            </button>
          </div>

          <div className="text-center mt-4">
            <button
              className="link link-primary"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;