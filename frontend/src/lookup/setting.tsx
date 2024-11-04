import { language } from "../main";

export const debugMode = () => {
  return true;
};

export const DEBUG_MODE = (endpoint: string) => {
  const DEBUG = debugMode();
  if (DEBUG) {
    return `http://localhost:8000/${language}/${endpoint}`;
  } else {
    const origin = window.location.origin;
    return `${origin}/${language}/${endpoint}`;
  }
};
