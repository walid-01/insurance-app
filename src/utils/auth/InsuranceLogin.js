async function PostInsuranceLogin(userName, password) {
  const response = await fetch("http://localhost:5047/Insurance-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userName, password }),
  });

  if (response.ok) {
    return response.json();
  } else if (response.status === 404) {
    throw new Error("User not found");
  } else {
    throw new Error("An error occurred");
  }
}

export default PostInsuranceLogin;
