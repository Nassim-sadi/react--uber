import React from "react";
import "@/assets/styles/footer.css";
const Footer = () => {
  const AppName = import.meta.env.VITE_APP_NAME;
  return (
    <div className="footer">
      <p>
        &copy; {new Date().getFullYear()} {AppName}. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
