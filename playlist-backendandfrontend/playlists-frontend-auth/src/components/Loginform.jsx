const LoginForm = ({
    handleLogin,
    username,
    setUsername,
    password,
    setPassword,
  }) => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    );
  };
  
  export default LoginForm;