const fetchExpertData = async (tokenValue) => {
  try {
    // Make the API call to fetch Expert data
    const response = await fetch("http://localhost:5047/Expert", {
      method: "GET",
      headers: {
        // Include the token in the request headers
        "Content-Type": "application/json",
        token: tokenValue,
      },
    });

    // Check if the response is successful
    if (response.ok) {
      // Parse the JSON response
      const expertData = await response.json();
      console.log(expertData);
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
