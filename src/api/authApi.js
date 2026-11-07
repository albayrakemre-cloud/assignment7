export const DEMO_USERNAME = "230408042@st.biruni.edu.tr";
const DEMO_PASSWORD = "123456";

//(500 ms)
export function login(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
        resolve({ username });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 500);
  });
}