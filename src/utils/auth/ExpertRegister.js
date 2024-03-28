async function PostExpertRegister(
  firstname,
  lastname,
  userName,
  password,
  phoneNumber,
  address,
  city
) {
  try {
    // console.log({
    //   firstname,
    //   lastname,
    //   userName,
    //   password,
    //   phoneNumber,
    //   address,
    //   city,
    // });
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
      // const { token } = await response.json();
      console.log(response);

      return true;
    } else if (response.status === 401) {
      throw new Error(response.text);
    } else {
      throw new Error(`An error occurred ${response.status}`);
    }
  } catch (e) {
    console.log(e);
  }
}

export default PostExpertRegister;
