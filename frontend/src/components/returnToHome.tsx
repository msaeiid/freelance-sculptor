import { Link } from "react-router-dom";
import { ButtonComponent } from "./button";

export function ReturnToHomeComponent() {
  return (
    <div className="ml-auto my-lg-2 px-lg-5">
      <Link to="/">
        <ButtonComponent
          class_name="btn btn-outline-primary"
          type="button"
          text={<i className="fas fa-home"></i>}
        />
      </Link>
    </div>
  );
}
