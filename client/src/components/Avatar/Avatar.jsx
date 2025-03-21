import React from "react";

const Avatar = ({ children, backgroundColor, px, py, borderRadius, color, fontSize, cursor }) => {
  const avatarStyle = {
    backgroundColor: backgroundColor || "black",
    padding: `${py} ${px}`,
    borderRadius: borderRadius || "50%",
    color: color || "#ffffff",
    fontSize: fontSize || "20px",
    textAlign: "center",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: cursor || "pointer",
    width: "30px",
    height: "30px",
    fontWeight: "bold",
  };

  return <div style={avatarStyle}>{children}</div>;
};

export default Avatar;
