import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

function Home() {
  const { currentUser } = useContext(UserContext);
  return (
    <div className="container p-5">
      <h1 className="display-3 text-light">
        {currentUser ? "Bienvenue, vous êtes connecté" : "Bonjour, veuillez vous inscrire ou vous connecter."}
      </h1>
    </div>
  );
}

export default Home;
