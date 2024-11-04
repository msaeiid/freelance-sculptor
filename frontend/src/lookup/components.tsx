import axios from "axios";
import { DEBUG_MODE } from "./setting";

interface ExtendedHeaders {
  "Content-Type": string;
  "X-Requested-With"?: string; // Optional property
  "X-CSRFToken"?: string; // Optional property
}

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export const lookup = async (
  method: string,
  endpoint: string,
  callback: (args1: any, arg2: number) => void,
  data = {},
  headers: ExtendedHeaders = { "Content-Type": "application/json" },
  completeUrl: boolean = false
) => {
  // csrftoken
  const csrftoken = getCookie("csrftoken");
  let modifiedHeaders = { ...headers };
  if (csrftoken) {
    modifiedHeaders = {
      ...modifiedHeaders,
      "X-Requested-With": "XMLHttpRequest",
      "X-CSRFToken": csrftoken,
    };
  }
  let url = endpoint;
  if (!completeUrl) {
    url = DEBUG_MODE(endpoint);
  }

  //
  try {
    const response = await axios({
      method,
      url,
      headers: modifiedHeaders,
      data,
    });
    callback(response.data, response.status);
  } catch (error) {
    const errorMessage: string[] = [];
    const errorData = (
      error as { response: { data: { [key: string]: string[] } } }
    ).response.data;
    Object.keys(errorData).map((item) => {
      errorMessage.push(`${item}: ${errorData[item]}`);
    });
    alert(errorMessage.join("\n"));
    // console.error(errorData);
    throw error;
  }
};
