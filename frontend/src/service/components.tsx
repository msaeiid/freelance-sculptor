import { SectionInterface } from "../components/homePage";
import { ServiceList } from "./list";

export function ServiceSection(props: SectionInterface) {
  const { status } = props;
  const messageToShowUser = (message: string, alert_type: string) => {
    const service_home_display = document.getElementById(
      "service_home_display"
    );
    if (service_home_display) {
      service_home_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };

  return (
    <div className="container-fluid pt-5" id="service">
      <div className="container mt-5">
        <div id="service_home_display"></div>
        <ServiceList messageToShowUser={messageToShowUser} status={status} />
      </div>
    </div>
  );
}
