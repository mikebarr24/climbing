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
            <p>
              <strong>Name</strong> - {user.name}
            </p>
            <p>
              <strong>Email</strong> - {user.email}
            </p>
            <p>
              <strong>Admin Account</strong> -{" "}
              {user.isAdmin === true ? "Yes" : "No"}
            </p>
            <div className="account--password-change-wrapper">
              <p>
                <strong>Password</strong> -{" "}
              </p>{" "}
              <button className="account--change-password-btn">
                Change Password
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Account;
