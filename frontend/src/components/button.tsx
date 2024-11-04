import { ReactNode } from "react";

interface ButtonInterface {
  text: ReactNode;
  class_name: string;
  type: "submit" | "reset" | "button";
  onclick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function ButtonComponent(props: ButtonInterface) {
  const { text, class_name, type, onclick } = props;
  return (
    <button
      className={class_name}
      type={type}
      onClick={(event) => {
        if (onclick) {
          onclick(event);
        }
      }}
    >
      {text}
    </button>
  );
}
