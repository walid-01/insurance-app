import jwt from "jsonwebtoken";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function useAuth() {
  const userContext = useContext(UserContext);
  const { fetchUserData } = userContext;

  const expertLogin = async (userName, password) => {
    try {
      const response = await fetch("http://localhost:5047/Expert-Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.status === 401) {
        return "User not found";
      }

      const data = await response.json();
      const date = new Date();

      date.setTime(jwt.decode(data.token).exp * 1000);

      document.cookie = `token=${data.token}; expires=${date}; path=/`;

      fetchUserData();
      return;
    } catch (err) {
      console.log(err);
    }
  };

  const expertRegister = async (
    firstname,
    lastname,
    userName,
    password,
    phoneNumber,
    address,
    city
  ) => {
    // console.log({
    //   firstname,
    //   lastname,
    //   userName,
    //   password,
    //   phoneNumber,
    //   address,
    //   city,
    // });

    try {
      const response = await fetch("http://localhost:5047/Expert-Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          userName,
          password,
          phoneNumber,
          address,
          city,
        }),
      });

      if (response.status === 204) {
        console.log(response);
        expertLogin(userName, password);

        return "Registred";
      } else if (response.status === 409) {
        return "Username taken";
      } else return "Uknown Error";
    } catch (err) {
      console.log(err);
    }
  };

  const insuranceLogin = async (userName, password) => {
    try {
      const response = await fetch("http://localhost:5047/Insurance-Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.status === 401) {
        return "User not found";
      }

      const data = await response.json();
      const date = new Date();

      date.setTime(jwt.decode(data.token).exp * 1000);

      document.cookie = `token=${data.token}; expires=${date}; path=/`;

      fetchUserData();
      return "Logged In";
    } catch (err) {
      console.log(err);
    }
  };

  const insuranceRegister = async (
    name,
    address,
    city,
    userName,
    password,
    agencyCode
  ) => {
    // console.log({
    //   name,
    //   address,
    //   city,
    //   userName,
    //   password,
    //   agencyCode,
    // });

    try {
      const response = await fetch("http://localhost:5047/Insurance-Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          address,
          city,
          userName,
          password,
          agencyCode,
        }),
      });

      if (response.status === 201) {
        console.log(response);
        insuranceLogin(userName, password);

        return "Registred";
      } else if (response.status === 409) {
        return "Username taken";
      } else return "Uknown Error";
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    // Clear the token from cookie
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    fetchUserData();
  };

  return {
    expertLogin,
    logout,
    expertRegister,
    insuranceLogin,
    insuranceRegister,
  };
}
