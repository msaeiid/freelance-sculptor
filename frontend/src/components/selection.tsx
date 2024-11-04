import { useEffect, useState } from "react";
import { CategoryInterface } from "../portfolio/category";
import { useTranslation } from "react-i18next";

interface SelectInterface {
  values: CategoryInterface[];
  selected?: string;
  name: string;
  tagClassName: string;
  required?: boolean;
  onChange?: (name: string, isValid: boolean) => void;
}

export function SelectComponent(props: SelectInterface) {
  const { values, selected, name, tagClassName, required, onChange } = props;
  const { t } = useTranslation();
  const [isValid, setIsValid] = useState(true);
  const [validationError, setValidationError] = useState("");
  const [initiate, setInitiate] = useState(false);

  function get_default(selected?: string) {
    const defaultValue = values.find((value) => value.title === selected);
    return defaultValue ? defaultValue.id : "";
  }
  const handleInputChange = (event: any) => {
    const newValue = event.target.value;
    const isValidInput = validate(newValue);
    onChange?.(name || "", isValidInput); // Pass validation status to parent
  };

  const validate = (newValue: any) => {
    let error = "";

    // 1. Check required field
    if (newValue === "" && required) {
      error = t("This field is required.");
    } else if (
      required &&
      typeof newValue !== "number" &&
      newValue.trim() === ""
    ) {
      error = t("This field is required.");
    }

    setIsValid(error === "");
    setValidationError(error);
    return error === ""; // Return true if valid, false if invalid
  };

  useEffect(() => {
    if (!initiate) {
      validate(selected);
      setInitiate(true);
    }
  }, [initiate, selected]);

  return (
    <div className="mb-3 row">
      <select
        name={name}
        className={`${tagClassName} ${validationError ? "is-invalid" : ""}`}
        defaultValue={get_default(selected).toString()}
        onChange={handleInputChange}
        aria-invalid={!isValid}
      >
        <option value=""></option>
        {values.map((value: CategoryInterface, index: number) =>
          value.title !== "All" ? (
            <option key={index} value={value.id}>
              {value.title}
            </option>
          ) : null
        )}
      </select>
      {validationError && (
        <div className={`${validationError && "invalid-feedback"}`}>
          {validationError}
        </div>
      )}
    </div>
  );
}
