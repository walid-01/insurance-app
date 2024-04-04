import useToken from "@/hooks/useToken";

const getInsurances = async () => {
  try {
    const { token } = useToken;
    const response = await fetch(`http://localhost:5047/InsurancesList`, {
      method: "GET",
      headers: {
        // Include the token in the request headers
        "Content-Type": "application/json",
        token,
      },
    });
    // Check if the response is successful
    if (response.ok) {
      // Parse the JSON response
      const insurances = await response.json();
      // console.log(insurances);
      return insurances;
    } else {
      throw new Error(`An error occurred ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default getInsurances;
