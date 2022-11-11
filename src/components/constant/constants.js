const dev_url = "http://localhost:50000";

const prod_url = "https://web2-lab-backend.onrender.com";

export const baseUrl =
  process.env.ENVIRONMENT === "production" ? prod_url : dev_url;
