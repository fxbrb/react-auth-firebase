import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function SignInModal() {
  const { toggleModals, modalState, signIn } = useContext(UserContext);
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

  const inputs = useRef([]);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
      console.log(inputs);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      await signIn(inputs.current[0].value, inputs.current[1].value);
      setValidation("");
      toggleModals("close");
      navigate("/private/home");
    } catch (err) {
      setValidation("Email ou mot de  passe incorrect.");
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");

    //     console.log(inputs);
  };

  return (
    <>
      {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
          <div
            onClick={() => closeModal()}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle bg-light p-4 rounded"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header mb-2">
                  <h5 className="modal-title">Connexion</h5>
                  <button
                    onClick={() => closeModal()}
                    className="btn-close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form
                    className="sign-in-form"
                    onSubmit={handleForm}
                    ref={formRef}
                  >
                    <div className="mb-3">
                      <label htmlFor="signInEmail" className="form-label">
                        Email
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signInEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signInPwd" className="form-label">
                        Mot de passe
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signInPwd"
                      />
                    </div>
                    <p className="text-danger mt-1">{validation}</p>

                    <button className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignInModal;
