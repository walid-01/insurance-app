import useToken from "@/hooks/useToken";

export default function useArchive() {
  const { getToken } = useToken();
  const token = getToken();

  const getArchive = async () => {
    try {
      const response = await fetch(
        `http://localhost:5047/ArchiveExpertiseReport`,
        {
          method: "GET",
          headers: {
            // Include the token in the request headers
            "Content-Type": "application/json",
            // userToken: token,
          },
        }
      );
      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
        const archive = await response.json();
        // console.log(archive);
        return archive;
      } else {
        throw new Error(`An error occurred ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  const getArchiveById = async (archiveId) => {
    try {
      const response = await fetch(
        `http://localhost:5047/ArchiveExpertiseReport/id?id=${archiveId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON response
        const file = await response.json();
        // console.log(file);
        return file;
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

  const submitArchive = async (archive) => {
    try {
      console.log({ ...archive, token });

      const response = await fetch(
        `http://localhost:5047/ArchiveExpertiseReport`,
        {
          method: "POST",
          headers: {
            // Include the token in the request headers
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...archive, token }),
        }
      );

      // Check if the response is successful
      if (response.ok) {
        return true;
      } else {
        throw new Error(`An error occurred ${response.status}`);
      }
    } catch (error) {
      console.error("Error submiting archive: ", error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  return {
    getArchive,
    getArchiveById,
    submitArchive,
  };
}
