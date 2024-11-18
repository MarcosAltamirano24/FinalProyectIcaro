import axios from "axios";

const fetchProfile = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/profile", {
      withCredentials: true,
    });
    console.log("Perfil obtenido:", response.data);
  } catch (error) {
    console.error("Error al obtener el perfil:", error);
  }
};

export default fetchProfile;
