import useToken from "@/hooks/useToken";

const getUserData = async () => {
  try {
    const { getToken, getRole } = useToken();
    const token = getToken();
    const role = getRole();

    if (!token || !role) return; // Exit early if no token or problem with role

    // Make the API call to fetch User data
    const response = await fetch(`http://localhost:5047/${role}`, {
      method: "GET",
      headers: {
        // Include the token in the request headers
        "Content-Type": "application/json",
        token: token,
      },
    });

    // Check if the response is successful
    if (response.ok) {
      // Parse the JSON response
      const userData = await response.json();

      return userData; // Return the fetched User data
    } else if (response.status === 401) {
      throw new Error("User not found");
    } else {
      throw new Error(`An error occurred ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching User data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default getUserData;
