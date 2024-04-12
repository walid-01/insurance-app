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
        throw new Error(`An error occurred ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const getOrderById = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5047/ServiceOrderById`, {
        method: "GET",
        headers: {
          // Include the token in the request headers
          "Content-Type": "application/json",
          userToken: token,
          id: orderId,
        },
      });
      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
        const orders = await response.json();
        // console.log(orders);
        return orders;
      } else if (response.status === 404) {
        return response.status;
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

  const submitExpertiseReport = async (expertiseReport) => {
    try {
      console.log({ ...expertiseReport, expertToken: token });

      const response = await fetch(`http://localhost:5047/ExpertiseReport`, {
        method: "POST",
        headers: {
          // Include the token in the request headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...expertiseReport, expertToken: token }),
      });

      // Check if the response is successful
      if (response.ok) {
        return true;
      } else {
        throw new Error(`An error occurred ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error submiting service expertiseReport data:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const reportRespond = async (expertiseReportID, isAccepted) => {
    try {
      // console.log({ expertiseReportID, insuranceToken: token, isAccepted });

      const response = await fetch(
        `http://localhost:5047/${isAccepted ? "Accept" : "Reject"}`,
        {
          method: "PUT",
          headers: {
            // Include the token in the request headers
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ expertiseReportID, insuranceToken: token }),
        }
      );

      console.log(response);

      // Check if the response is successful
      if (response.ok) {
        return true;
      } else {
        throw new Error(`An error occurred ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting service order data:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  return {
    getOrders,
    submitOrder,
    getOrderById,
    submitExpertiseReport,
    reportRespond,
  };
}
