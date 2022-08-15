import axios from "axios";
const newUser = async (user) => {
  try {
    const res = await axios.post("/api/users", {
      name: user.name,
      email: user.email,
      password: user.password,
      isAdmin: false,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default newUser;
