const GreetingLogout = ({ userObject, handleLogout }) => {
    return (
      <div>
        <em>What's up, {userObject.username}!</em>
        <button onClick={handleLogout}>Log out</button>
      </div>
    );
  };
  
  export default GreetingLogout;