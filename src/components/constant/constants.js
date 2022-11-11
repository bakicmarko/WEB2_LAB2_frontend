const dev_url = "http://localhost:5000";

const prod_url = "https://web2-lab-backend.onrender.com";

export const baseUrl =
  process.env.REACT_APP_ENVIRONMENT === "production" ? prod_url : dev_url;
