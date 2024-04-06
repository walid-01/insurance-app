const getExperts = async () => {
  try {
    const response = await fetch(`http://localhost:5047/Experts`, {
      method: "GET",
      headers: {
        // Include the token in the request headers
        "Content-Type": "application/json",
      },
    });
    // Check if the response is successful
    if (response.ok) {
      // Parse the JSON response
      const experts = await response.json();
      // console.log(experts);
      return experts;
    } else {
      throw new Error(`An error occurred ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default getExperts;
