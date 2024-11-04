import { FormEvent, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface FormInterface {
  children?: React.ReactNode;
  onFormSubmit: (
    data: { [k: string]: FormDataEntryValue },
    isChanged: boolean
  ) => void;
  formIsValid: boolean;
  clearForm?: boolean;
  errorMessage?: string[];
}

export function FormComponent(props: FormInterface) {
  const { children, onFormSubmit, formIsValid, clearForm, errorMessage } =
    props;
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [isChanged, setIsChanged] = useState(false);

  const submitButtonAfterClick = (status: boolean) => {
    const submit_btn = document.getElementById("submit_btn_from");
    if (status && submit_btn) {
      submit_btn.setAttribute("disabled", "disabled");
      submit_btn.innerHTML = t("Saving changes...");
    }
    if (!status && submit_btn) {
      submit_btn.removeAttribute("disabled");
      submit_btn.innerHTML = t("Save");
    }
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitButtonAfterClick(true);
    const formElement = formRef.current;
    if (formElement) {
      const data = new FormData(formElement);
      onFormSubmit(Object.fromEntries(data), isChanged);
    }
    if (clearForm && formRef.current && formIsValid) {
      formRef.current.reset();
    }
    document.getElementById("close")?.click();
    submitButtonAfterClick(false);
  };

  const handleFieldChange = () => {
    setIsChanged(true);
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleOnSubmit}
        onChange={handleFieldChange}
        noValidate
      >
        <>{children && children}</>
        <div className={`${!formIsValid ? "" : "d-none"}`} role="alert">
          <ErrorMessage message={errorMessage} />
        </div>
        <div className="modal-footer border-0">
          <button
            type="submit"
            className="btn btn-outline-primary mx-auto"
            id="submit_btn_from"
          >
            {t("Send")}
          </button>
        </div>
      </form>
    </>
  );
}

interface ErrorMessageProps {
  message?: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  const { t } = useTranslation();
  return (
    <div className="text-primary">
      {message ? (
        <>
          <p>
            Check the field{" "}
            {message.map((item, index) => {
              return (
                <span key={index}>
                  , <strong>{item}</strong>
                </span>
              );
            })}
          </p>
        </>
      ) : (
        <p>{t("Please Check fields")}</p>
      )}
    </div>
  );
};
