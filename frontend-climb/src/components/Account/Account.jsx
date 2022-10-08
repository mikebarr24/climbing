import "./Account.scss";

function Account({ user }) {
  return (
    <div id="account" className="container">
      <h1>Account</h1>
      {user && (
        <>
          <h2>
            Hello {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
          </h2>
          <div className="account--user-details standard-text">
            <p>Name - {user.name}</p>
            <p>Name - {user.email}</p>
            <p>Admin Account - {user.isAdmin === true ? "Yes" : "No"}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Account;
