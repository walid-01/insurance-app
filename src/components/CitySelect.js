import React from "react";

const CitySelect = ({ city, setCity, isDisabled = false, className = "" }) => {
  return (
    <select
      disabled={isDisabled}
      required
      id="city"
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className={`rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-cyan-800 ${className}`}
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
  );
};

export default CitySelect;
