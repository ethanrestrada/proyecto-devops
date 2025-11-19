import React from "react";

function Message({ message, bgColor }) {
  let styles = {
    padding: "1rem",
    marginBottom: "1rem",
    textAlign: "center",
    backgroundColor: bgColor,
    color: "#fff",
    fontWeight: "bold",
  };

  return (
    <div style={styles}>
      <p>{message}</p>
    </div>
  );
}

export default Message;
