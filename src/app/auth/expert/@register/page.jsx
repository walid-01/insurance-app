"use client";
import { useState } from "react";
import PostExpertRegister from "@/utils/auth/ExpertRegister";
import PostExpertLogin from "@/utils/auth/ExpertLogin";
import useAuth from "@/hooks/useAuth";

export default function ExpertRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [userName, setUserName] = useState("walid");
  const [password, setPassword] = useState("walid23");
  const [confirmPassword, setConfirmPassword] = useState("walid23");
  const [phoneNumber, setPhoneNumber] = useState(5);
  const [address, setAddress] = useState("walid23");
  const [city, setCity] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const registerResponse = await PostExpertRegister(
        firstname,
        lastname,
        userName,
        password,
        phoneNumber.toString(),
        address,
        parseInt(city)
      );

      if (registerResponse) {
        console.log("Registered Successfuly");

        const loginResponse = await PostExpertLogin(userName, password);
        login(loginResponse);
        console.log("Login Response " + loginResponse);
      } else {
        throw new error("Unkonw Error");
      }
    } catch (error) {
      if (error.message === "User not found") {
        console.log("Invalid username or password");
      } else {
        console.log("Unkown login error:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="RegisterFirstname">Firstname:</label>
          <input
            required
            type="text"
            id="RegisterFirstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterLastname">Lastname:</label>
          <input
            required
            type="text"
            id="RegisterLastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterUserName">Username:</label>
          <input
            required
            type="text"
            id="RegisterUserName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterPassword">Password:</label>
          <input
            required
            type="password"
            id="RegisterPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterConfirmPassword">Confirm Password:</label>
          <input
            required
            type="password"
            id="RegisterConfirmPassword"
            value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterPhoneNumber">Phone Number:</label>
          <input
            required
            type="tel"
            id="RegisterPhoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterAddress">Address:</label>
          <input
            required
            type="text"
            id="RegisterAddress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="RegisterCity">City:</label>
          <select
            required
            id="RegisterCity"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="" disabled>
              Select a city
            </option>
            <option value="0">1 - Adrar</option>
            <option value="1">2 - Chlef</option>
            <option value="2">3 - Laghouat</option>
            <option value="3">4 - Oum El Bouaghi</option>
            <option value="4">5 - Batna</option>
            <option value="5">6 - Béjaïa</option>
            <option value="6">7 - Biskra</option>
            <option value="7">8 - Béchar</option>
            <option value="8">9 - Blida</option>
            <option value="9">10 - Bouira</option>
            <option value="10">11 - Tamanrasset</option>
            <option value="11">12 - Tébessa</option>
            <option value="12">13 - Tlemcen</option>
            <option value="13">14 - Tiaret</option>
            <option value="14">15 - Tizi Ouzou</option>
            <option value="15">16 - Algiers</option>
            <option value="16">17 - Djelfa</option>
            <option value="17">18 - Jijel</option>
            <option value="18">19 - Sétif</option>
            <option value="19">20 - Saïda</option>
            <option value="20">21 - Skikda</option>
            <option value="21">22 - Sidi Bel Abbès</option>
            <option value="22">23 - Annaba</option>
            <option value="23">24 - Guelma</option>
            <option value="24">25 - Constantine</option>
            <option value="25">26 - Médéa</option>
            <option value="26">27 - Mostaganem</option>
            <option value="27">28 - M&apos;Sila</option>
            <option value="28">29 - Mascara</option>
            <option value="29">30 - Ouargla</option>
            <option value="30">31 - Oran</option>
            <option value="31">32 - El Bayadh</option>
            <option value="32">33 - Illizi</option>
            <option value="33">34 - Bordj Bou Arréridj</option>
            <option value="34">35 - Boumerdès</option>
            <option value="35">36 - El Tarf</option>
            <option value="36">37 - Tindouf</option>
            <option value="37">38 - Tissemsilt</option>
            <option value="38">39 - El Oued</option>
            <option value="39">40 - Khenchela</option>
            <option value="40">41 - Souk Ahras</option>
            <option value="41">42 - Tipaza</option>
            <option value="42">43 - Mila</option>
            <option value="43">44 - Aïn Defla</option>
            <option value="44">45 - Naâma</option>
            <option value="45">46 - Aïn Témouchent</option>
            <option value="46">47 - Ghardaïa</option>
            <option value="47">48 - Relizane</option>
            <option value="48">49 - El M&apos;ghair</option>
            <option value="49">50 - El Menia</option>
            <option value="50">51 - Ouled Djellal</option>
            <option value="51">52 - Bordj Baji Mokhtar</option>
            <option value="52">53 - Beni Abbes</option>
            <option value="53">54 - Timimoun</option>
            <option value="54">55 - Tolga</option>
            <option value="55">56 - Touggourt</option>
            <option value="56">57 - Djanet</option>
            <option value="57">58 - In Salah</option>
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
      {error && <p className="text-red-600">{error}</p>}
    </>
  );
}
