import useToken from "@/hooks/useToken";

export default function useServiceOrder() {
  const { getToken } = useToken();
  const token = getToken();

  const getOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5047/ServiceOrder`, {
        method: "GET",
        headers: {
          // Include the token in the request headers
          "Content-Type": "application/json",
          userToken: token,
        },
      });
      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
        const orders = await response.json();
        // console.log(orders);
        return orders;
      } else {
        throw new Error(`An error occurred ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const submitOrder = async (order) => {
    try {
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

  return { getOrders, submitOrder };
}
