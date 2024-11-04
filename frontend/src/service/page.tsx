import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { lookup } from "../lookup";
import { ServiceInterface } from "./service";
import { UpdateServiceComponent } from "./update";
import { NavbarComponent } from "../navbar";
import { languageDirection } from "../main";
import { paths_dict } from "../lookup/url";
import { AsideComponent } from "../components/aside";

export function ServicePageComponent() {
  const [service, setService] = useState<ServiceInterface>();
  const [serviceLoaded, setServiceLoaded] = useState(false);
  const { id } = useParams<{ id: string }>();

  const handleServiceLookup = (response: ServiceInterface, status: number) => {
    if (status === 200) {
      setService(response);
      setServiceLoaded(true);
    }
  };

  useEffect(() => {
    if (!serviceLoaded) {
      const endpoint = `${paths_dict.service}${id}/`;
      lookup(
        "GET",
        endpoint,
        handleServiceLookup,
        {},
        { "Content-Type": "application/json" }
      );
    }
  }, [serviceLoaded, id]);

  const messageToShowUser = (message: string, alert_type: string) => {
    const service_page_display = document.getElementById(
      "service_page_display"
    );
    if (service_page_display) {
      service_page_display.innerHTML = `<div class='${alert_type}'> <button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times; </button> <strong>${message}</strong></div>`;
    }
  };
  return (
    <>
      <NavbarComponent home={false} />
      <div
        className={`col-lg-7 col-md-10 col-sm-12 py-5 px-4 my-5 mx-auto ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        <div id="service_page_display"></div>
        <UpdateServiceComponent
          messageToShowUser={messageToShowUser}
          service={service}
          setService={setService}
        />
      </div>

      <div className="col-lg-7 col-md-12 col-sm-12 mx-auto mb-5 text-center">
        <aside>
          <AsideComponent asideType="service" id={id} />
        </aside>
      </div>
    </>
  );
}
