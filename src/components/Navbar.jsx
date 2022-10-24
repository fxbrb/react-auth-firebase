import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

function Navbar() {
  const { toggleModals } = useContext(UserContext);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // logout function
  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      alert("Impossible de se deconnecté.");
    }
  };
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brans">
        FirebaseReactAuth
      </Link>

      <div>
        {!currentUser ? (
          <button
            onClick={() => toggleModals("signUp")}
            className="btn btn-primary"
          >
            Inscription
          </button>
        ) : (
          ""
        )}

        <button
          onClick={() => toggleModals("signIn")}
          className="btn btn-primary ms-2"
        >
          Connexion
        </button>
        {currentUser ? (
          <button onClick={logOut} className="btn btn-danger ms-2">
            Deconnexion
          </button>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

export default Navbar;
