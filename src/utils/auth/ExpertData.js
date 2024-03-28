const fetchExpertData = async () => {
  try {
    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    if (!token) {
      throw new Error("Token not found in cookies");
    }
    const tokenValue = token.split("=")[1];

    // Make the API call to fetch Expert data
    const response = await fetch("http://localhost:5047/Expert", {
      method: "GET",
      headers: {
        // Include the token in the request headers
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenValue }),
    });

    // Check if the response is successful
    if (response.ok) {
      // Parse the JSON response
      const expertData = await response.json();
      return expertData; // Return the fetched Expert data
    } else {
      // Handle the error if the response is not successful
      throw new Error("Failed to fetch Expert data");
    }
  } catch (error) {
    console.error("Error fetching Expert data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default fetchExpertData;
