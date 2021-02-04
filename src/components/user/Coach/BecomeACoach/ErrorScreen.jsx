import React from "react";
import Heading from "../../../ui/heading/Heading"; 

export default function ErrorScreen({message = ""}) {

  return <>
    <Heading>There has been an error</Heading>
    <p>{message}</p>
  </>
}