import React, { createContext, useCallback, useState } from "react";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";

export const AuthContext = createContext({});

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  name: null,
  user_name: null,
  rol_name: null,
  loading: false,
  image: null,
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
  createdAt: null,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  const login = async (userName, password) => {
    setAuth({
      ...auth,
      loading: true,
    });

    const resp = await fetchSinToken(
      "auth/login",
      { userName, password },
      "POST"
    );
    const body = await resp.json();

    if (body.usuario) {
      localStorage.setItem("token", body.token);

      setAuth({
        uid: body.usuario.id,
        checking: false,
        logged: true,
        name: body.usuario.firstName,
        user_name: body.usuario.userName,
        rol_name: body.usuario.roles,
        loading: false,
        image: body.usuario.image,
        first_name: body.usuario.firstName,
        last_name: body.usuario.lastName,
        email: body.usuario.email,
        phone: body.usuario.phone,
        createdAt: body.usuario.createdAt,
      });
    } else {
      setAuth({
        ...auth,
        loading: false,
      });

      if (body.location === "MW") {
        let erroresmw = [];
        let estring = "";

        body.errors.errors.forEach((error) => {
          erroresmw.push(error.msg);
        });

        estring = erroresmw.join(", ");

        Swal.fire({
          icon: "error",
          title: "Error " + resp.status,
          text: estring,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error " + resp.status,
          text: body.msg,
          showConfirmButton: false,
          timer: 1000,
        });
      }
    }

    return body.ok;
  };

  const verificaToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    // Si token no existe
    if (!token) {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        user_name: null,
        rol_name: null,
        loading: false,
        image: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        createdAt: null,
      });

      return false;
    }

    const resp = await fetchConToken("auth/login", {}, "GET");
    const body = await resp.json();

    if (body.usuario) {
      localStorage.setItem("token", body.token);

      setAuth({
        uid: body.usuario.id,
        checking: false,
        logged: true,
        name: body.usuario.firstName,
        user_name: body.usuario.userName,
        rol_name: body.usuario.roles,
        loading: false,
        image: body.usuario.image,
        first_name: body.usuario.firstName,
        last_name: body.usuario.lastName,
        email: body.usuario.email,
        phone: body.usuario.phone,
        createdAt: body.usuario.createdAt,
      });

      return true;
    } else {
      setAuth({
        uid: null,
        checking: false,
        logged: false,
        name: null,
        user_name: null,
        rol_name: null,
        loading: false,
        image: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        createdAt: null,
      });

      return false;
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({
      uid: null,
      checking: false,
      logged: false,
      name: null,
      user_name: null,
      rol_name: null,
      loading: false,
      image: null,
      first_name: null,
      last_name: null,
      email: null,
      phone: null,
      createdAt: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        verificaToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
