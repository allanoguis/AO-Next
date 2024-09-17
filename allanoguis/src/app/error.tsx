"use client";
import React from "react";

const ErrorComponent = ({ error }: { error: Error }) => {
  console.error("error", error);
  return <div>An error occurred: {error.message}</div>;
};

export default ErrorComponent;
