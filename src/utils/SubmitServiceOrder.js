import useToken from "@/hooks/useToken";

const submitOrder = async (order) => {
  try {
    const { getToken } = useToken();
    const token = getToken();
    console.log({ ...order, victimInsuranceToken: token });

    const response = await fetch(`http://localhost:5047/CreateServiceOrder`, {
      method: "POST",
      headers: {
        // Include the token in the request headers
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...order, victimInsuranceToken: token }),
    });

    // Check if the response is successful
    if (response.ok) {
      return true;
    } else {
      throw new Error(`An error occurred ${response.status}`);
    }
  } catch (error) {
    console.error("Error submiting service order data:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export default submitOrder;
