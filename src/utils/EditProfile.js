import useToken from "@/hooks/useToken";

const editProfile = async (data) => {
  try {
    const { getRole, getToken } = useToken();
    const role = getRole();
    const token = getToken();

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

export default editProfile;
