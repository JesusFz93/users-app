import React, { useEffect, useContext } from "react";

import { useForm } from "react-hook-form";

import { AuthContext } from "../../auth/AuthContext";

const initValues = {
  userName: "",
  password: "",
};

export const LoginPage = () => {
  const { auth, login } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { isDirty },
  } = useForm({
    defaultValues: initValues,
  });

  const formModel = {
    userName: "",
    password: "",
  };

  const submit = async (register) => {
    formModel.userName = register.userName;
    formModel.password = register.password;

    const { userName, password } = formModel;

    await login(userName, password);

    setFocus("userName");
    reset();
  };

  useEffect(() => {
    setFocus("userName");
  }, [setFocus]);

  return (
    <div className="container bg-dark">
      {
        <section
          className="login-dark mt-5 container d-flex align-items-center justify-content-center"
          style={{ height: "90vh" }}
        >
          <form method="post" onSubmit={handleSubmit(submit)}>
            <img
              src="https://img2.freepng.es/20190607/eky/kisspng-e-commerce-business-retail-online-shopping-service-retail-intersoft-5cfad8d5b3adb8.404565371559943381736.jpg"
              alt="User login"
              style={{ width: "200px" }}
            />
            <h2>Iniciar sesion</h2>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="User id"
                autoComplete="off"
                {...register("userName")}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <div className="mb-3">
              <button
                className="btn btn-light d-block w-100"
                type="submit"
                disabled={!isDirty || auth.loading}
              >
                Acceder
              </button>
            </div>

            {auth.loading && (
              <div className="mb-3">
                <div className="row">
                  <div className="col text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </section>
      }
    </div>
  );
};

// import React from "react";

// export const LoginPage = () => {
//   return (
//     <div
//       className="container border border-dark d-flex align-items-center justify-content-center"
//       style={{ height: "100vh" }}
//     >
//       <main className="row">
//         <article className="col">
//           <form>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Iniciar sesion"
//             />
//             <input type="text" className="form-control" placeholder="Contra" />
//           </form>
//         </article>
//       </main>
//     </div>
//   );
// };
