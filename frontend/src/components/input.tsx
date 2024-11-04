import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

type ValidationRule = (value: string) => boolean;

interface InputProps {
  required?: boolean;
  type?: string;
  className?: string;
  label?: string;
  placeholder?: string;
  name?: string;
  value?: any;
  defaultValue?: any;
  defaultChecked?: boolean;
  onChange?: (name: string, isValid: boolean) => void;
  // onChange?: (name: string, value: string, isValid: boolean) => void;
  validationRules?: { [ruleName: string]: ValidationRule }; // Object defining validation rules
  errorMessage?: string; // Default error message (optional)
  // ...otherProps: JSX.IntrinsicAttributes; // Allow additional props for customization
  multiline?: boolean;
  rows?: number;
  hide_label?: boolean;
  role?: string;
  preventValidationAtFirst?: boolean;
}

const Input: React.FC<InputProps> = ({
  required,
  type = "text",
  className,
  label,
  placeholder,
  name,
  value,
  defaultValue,
  defaultChecked,
  onChange,
  // validationRules,
  // errorMessage,
  // ...otherProps
  multiline,
  rows,
  hide_label,
  role,
  preventValidationAtFirst = false,
}) => {
  const [isValid, setIsValid] = useState(true);
  const { t } = useTranslation();
  const [validationError, setValidationError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [initiate, setInitiate] = useState(preventValidationAtFirst);

  const validate = (newValue: any) => {
    let error = "";

    // 1. Check required field
    if (newValue === undefined && required) {
      error = t("This field is required.");
    } else if (
      required &&
      typeof newValue !== "number" &&
      newValue.trim() === ""
    ) {
      error = t("This field is required.");
    }

    // 2. Check built-in validation rules (if provided)
    // if (validationRules) {
    //   Object.keys(validationRules).forEach((ruleName) => {
    //     const ruleFn = validationRules[ruleName];
    //     if (!ruleFn(newValue)) {
    //       error = errorMessage || ruleFn.errorMessage; // Use default or rule-specific message
    //       return false; // Exit loop after first error
    //     }
    //   });
    // }

    // 3. Check browser's built-in HTML validation (using input element validity)
    // if (inputRef.current && !inputRef.current.validity.valid) {
    //   const validityState = inputRef.current.validity;
    //   error = validityState.patternMismatch
    //     ? "Invalid format."
    //     : validityState.customError;
    // }

    setIsValid(error === "");
    setValidationError(error);
    return error === ""; // Return true if valid, false if invalid
  };

  useEffect(() => {
    if (!initiate) {
      validate(defaultValue);
      setInitiate(true);
    }
  }, [defaultValue, initiate]);

  const handleInputChange = (event: any) => {
    const newValue = event.target.value;
    const isValidInput = validate(newValue);
    onChange?.(name || "", isValidInput); // Pass validation status to parent
  };

  return (
    <div className="mb-3 row">
      {!hide_label && (
        <label className="col-sm-3 col-form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <div className={`col-sm-${!hide_label ? "9" : "12"}`}>
        {multiline ? (
          <textarea
            id={name}
            required={required}
            className={`${className} ${validationError ? "is-invalid" : ""}`}
            placeholder={placeholder}
            name={name}
            value={value}
            defaultValue={defaultValue}
            defaultChecked={defaultChecked}
            //value={value || ""} // Ensure value is always a string
            onChange={handleInputChange}
            //ref={inputRef}
            // ...otherProps
            // Add visual cues for validation state (optional)
            aria-invalid={!isValid}
            aria-describedby={`${name}-error`} // Links error message to the input
            rows={rows}
          ></textarea>
        ) : (
          <input
            id={name}
            required={required}
            type={type}
            role={role}
            className={`${className} ${validationError ? "is-invalid" : ""}`}
            placeholder={placeholder}
            name={name}
            value={value}
            defaultValue={defaultValue}
            defaultChecked={defaultChecked}
            //value={value || ""} // Ensure value is always a string
            onChange={handleInputChange}
            ref={inputRef}
            // ...otherProps
            // Add visual cues for validation state (optional)
            aria-invalid={!isValid}
            aria-describedby={`${name}-error`} // Links error message to the input
          />
        )}
        {validationError && (
          <div className={`${validationError && "invalid-feedback"}`}>
            {validationError}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
