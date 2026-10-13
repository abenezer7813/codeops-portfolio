
export  async function getDishes() {
  return fetch("https://addis-eats-backend.onrender.com/menu/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch dishes");
      }

      return response.json();
    })
    .then((result) => {
      console.log(result);
      return result.data;
    })
    .catch((error) => {
      console.error("Error fetching dishes:", error);
      throw error;
    });
}