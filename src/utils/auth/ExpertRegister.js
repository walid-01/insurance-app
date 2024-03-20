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

    if (response.ok) {
      const { token } = await response.json();
      console.log(token);
      return token;
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
