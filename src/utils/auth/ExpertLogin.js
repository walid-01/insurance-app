const PostExpertLogin = async (userName, password) => {
  try {
    const response = await fetch("http://localhost:5047/Expert-Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else if (response.status === 401) {
      throw new Error("User not found");
    } else {
      throw new Error(`An error occurred ${response.status}`);
    }
  } catch (e) {
    console.log(e);
  }
};

export default PostExpertLogin;
