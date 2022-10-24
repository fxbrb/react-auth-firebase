import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

function SignUpModal() {
  const { toggleModals, modalState, signUp } = useContext(UserContext);
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();

  const inputs = useRef([]);
  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match");
      return;
    }

    try {
      await signUp(inputs.current[0].value, inputs.current[1].value);
      formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/private/home");
      // console.log(cred);
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setValidation("Email format invalid");
      }
      if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used");
      }
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");

    //     console.log(inputs);
  };

  return (
    <>
      {modalState.signUpModal && (
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
                  <h5 className="modal-title">Inscription</h5>
                  <button
                    onClick={() => closeModal()}
                    className="btn-close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form
                    className="sign-up-form"
                    onSubmit={handleForm}
                    ref={formRef}
                  >
                    <div className="mb-3">
                      <label htmlFor="signUpEmail" className="form-label">
                        Email
                      </label>
                      <input
                        ref={addInputs}
                        name="email"
                        required
                        type="email"
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Mot de passe
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="signUpPwd"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="repeatPwd" className="form-label">
                        Confirmez votre mot de passe
                      </label>
                      <input
                        ref={addInputs}
                        name="pwd"
                        required
                        type="password"
                        className="form-control"
                        id="repeatPwd"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>

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

export default SignUpModal;
