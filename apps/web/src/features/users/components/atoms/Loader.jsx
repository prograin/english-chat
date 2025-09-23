import React from "react";

export default function Loader({ message = "Loading..." }) {
  return <p className="text-center text-secondary mt-10 text-lg">{message}</p>;
}
