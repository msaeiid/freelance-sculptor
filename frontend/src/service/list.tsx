import { useEffect, useState } from "react";
import { ServiceComponent, ServiceInterface } from "./service";
import { lookup } from "../lookup";
import { AddServiceComponent } from "./add";
import { useTranslation } from "react-i18next";
import { languageDirection, canEdit } from "../main";
import { paths_dict } from "../lookup/url";
import { HideOrShowSection } from "../components/HideOrShowSection";

export interface ServiceListInterface {
  messageToShowUser: (message: string, alert_type: string) => void;
  status: boolean;
}

interface ServerResponse {
  count: number;
  next: URL;
  previous: URL;
  results: ServiceInterface[];
}

export function ServiceList(props: ServiceListInterface) {
  const { messageToShowUser, status } = props;
  const { t } = useTranslation();
  const [services, setServices] = useState<ServiceInterface[]>([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [isNext, setIsNext] = useState(false);
  const [path, setPath] = useState(`${paths_dict.service}?page_size=3`);
  const [completeUrl, setCompleteUrl] = useState(false);

  const loadMore = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    // const url = path.toString().replace(/^https?:\/\/[^/]+\//, "");

    setPath(path);
    setCompleteUrl(true);
    setServicesLoaded(false);
  };

  const handleServiceLookup = (response: ServerResponse, status: number) => {
    if (response.next) {
      setIsNext(true);
      setPath(response.next.toString());
      setCompleteUrl(true);
    } else {
      setIsNext(false);
      setPath("");
      setCompleteUrl(false);
    }
    if (status === 200) {
      const final = [...services].concat(response.results);
      if (final.length !== services.length) {
        setServices(final);
      }
      setServicesLoaded(true);
    }
  };

  useEffect(() => {
    if (!servicesLoaded) {
      lookup(
        "GET",
        path,
        handleServiceLookup,
        {},
        { "Content-Type": "application/json" },
        completeUrl
      );
    }
  }, [servicesLoaded, path, completeUrl]);

  return (
    <>
      <div className="position-relative d-flex align-items-center justify-content-center">
        <h1
          className="display-1 text-uppercase text-white"
          style={{ WebkitTextStroke: "1px #dee2e6" }}
        >
          {t("Service")}
        </h1>
        <h1 className="position-absolute text-uppercase text-primary">
          {t("My Service")}
        </h1>
      </div>
      <div className="col-12 text-center">
        {canEdit && (
          <>
            <AddServiceComponent
              setServices={setServices}
              messageToShowUser={messageToShowUser}
              services={services}
            />
            <HideOrShowSection section="service_public" toggleStatus={status} />
          </>
        )}
      </div>
      <div
        className={`row pb-3 ${languageDirection}`}
        dir={`${languageDirection}`}
      >
        {services.map((service: ServiceInterface, index: number) => (
          <ServiceComponent {...service} key={`${index}-${service.id}`} />
        ))}
        {isNext && (
          <div className="col-12 text-center my-5">
            <button
              className="btn btn-outline-primary btn-lg"
              onClick={loadMore}
            >
              {t("More")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
