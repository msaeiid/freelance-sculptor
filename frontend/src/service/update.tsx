import { lookup } from "../lookup/components";
import { ModalComponent } from "../components";
import { ServiceInterface } from "./service";
import { ServiceFormMaker } from "./form";
import { DeleteService } from "./delete";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { canEdit } from "../main";
import { paths_dict } from "../lookup/url";
import { ConvertEnglishDigitToPersianOrArabic } from "../lookup/fa";

interface UpdateServiceComponentInterface {
  service?: ServiceInterface;
  setService: (data: any) => void;
  messageToShowUser: (message: string, alert_type: string) => void;
}

export function UpdateServiceComponent(props: UpdateServiceComponentInterface) {
  const { service, setService, messageToShowUser } = props;
  const { t } = useTranslation();

  const CloseModal = () => {
    const modalCloseButton = document.getElementById("closeModal");
    modalCloseButton?.click();
  };

  const handleOnServiceFormSubmit = (
    data: any,
    isChanged: boolean,
    bodyChanged: boolean
  ) => {
    const endpoint = `${paths_dict.service}${data.id}/`;
    if (isChanged || bodyChanged) {
      lookup(
        "PUT",
        endpoint,
        (response, status) => {
          if (status === 200) {
            setService(response);
            messageToShowUser(
              t("objectUpdated", { title: response.title }),
              "alert alert-success"
            );
          }
        },
        data,
        { "Content-Type": "application/json" }
      ).catch((error) => {
        messageToShowUser(
          t(
            `Sorry it seems that server is not responding. Please try again later!\n${error}`
          ),
          "alert alert-danger"
        );
      });
    }
    CloseModal();
  };

  const handleOnServiceButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    service: ServiceInterface
  ) => {
    event.preventDefault();
    setService(service);
  };
  const [formIsValid, setFormIsValid] = useState(true);

  return (
    <>
      {service && (
        <div className="row pb-3 background-div">
          {canEdit && (
            <>
              <ModalComponent
                buttonClassName="m-3 btn btn-sm btn-outline-secondary"
                buttonFontAwesome="fas fa-edit"
                onButtonClick={(event) => {
                  handleOnServiceButtonClick(event, service);
                }}
                // onModalClose={handleOnModalClosed},
                large={true}
              >
                <ServiceFormMaker
                  service={service}
                  setFormIsValid={setFormIsValid}
                  formIsValid={formIsValid}
                  handleProfileUpdated={handleOnServiceFormSubmit}
                />
              </ModalComponent>
              <DeleteService
                service={service}
                messageToShowUser={messageToShowUser}
              />
            </>
          )}
          <div className="col-lg-12 col-md-12 col-sm-12 text-center my-5">
            <div className="d-flex align-items-center justify-content-center mb-4">
              <i
                className={`${service.icon} service-icon bg-primary text-white mr-3`}
              ></i>
              <h1 className="font-weight-bold mx-2 truncate">
                {ConvertEnglishDigitToPersianOrArabic(service.title)}
              </h1>
            </div>
            <h4>
              {ConvertEnglishDigitToPersianOrArabic(service.short_description)}
            </h4>
          </div>
          <div
            className="ql-editor col-12 my-3"
            dangerouslySetInnerHTML={{
              __html: ConvertEnglishDigitToPersianOrArabic(service.body),
            }}
          />
        </div>
      )}
    </>
  );
}
