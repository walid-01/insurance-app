import useToken from "@/hooks/useToken";

export default function useUser() {
  const { getToken, getRole } = useToken();

  const getUserData = async () => {
    try {
      const token = getToken();
      const role = getRole();

      if (!token || !role) return null; // Exit early if no token or problem with role

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

  const getInsurances = async () => {
    try {
      const response = await fetch(`http://localhost:5047/InsurancesList`, {
        method: "GET",
        headers: {
          // Include the token in the request headers
          "Content-Type": "application/json",
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

  const editProfile = async (data) => {
    const token = getToken();
    const role = getRole();

    try {
      console.log(data);

      const response = await fetch(`http://localhost:5047/${role}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, token }),
      });

      console.log(response);

      return response.status;
    } catch (error) {
      console.error("Error editing profile:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  return { getUserData, getExperts, getInsurances, editProfile };
}
