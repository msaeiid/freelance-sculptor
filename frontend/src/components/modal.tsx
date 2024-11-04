import { useState } from "react";

interface ModalInterface {
  children?: React.ReactNode;
  buttonFontAwesome: string;
  buttonClassName: string;
  onButtonClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onModalClose?: (status: boolean) => void;
  large?: boolean;
}

export function ModalComponent(props: ModalInterface) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    children,
    buttonFontAwesome,
    buttonClassName,
    onButtonClick,
    onModalClose,
    large,
  } = props;

  const closeModal = () => {
    setIsOpen(false);
    if (onModalClose) {
      onModalClose(false);
    }
  };

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className={buttonClassName}
        data-toggle="modal"
        data-target="#exampleModalLong"
        onClick={(event) => {
          if (onButtonClick) {
            onButtonClick(event);
          }
          setIsOpen(true);
        }}
      >
        <i className={buttonFontAwesome}></i>
      </button>
      {/* Modal */}
      {isOpen && (
        <div
          className="modal fade"
          id="exampleModalLong"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
          data-backdrop="static" // Prevents closing on backdrop click
          data-keyboard="false" // Prevents closing on escape key press
        >
          <div
            className={`modal-dialog modal-dialog-centered ${
              large === true ? "modal-lg" : ""
            }`}
            role="document"
          >
            <div className="modal-content p-3 pb-0">
              <div className="modal-header border-0">
                <button
                  id="closeModal"
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <>{children && children}</>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
