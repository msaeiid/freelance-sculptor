import { useEffect, useState } from "react";

export function ScrollComponent() {
  // Back to top button
  const [backToTop, setBackToTop] = useState(false);
  // Scroll to Bottom
  const [scrollToBottom, setScrollToBottom] = useState(true);
  const handleBackToTop = () => {
    if (window.scrollY > 200) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  };

  const handleBackToTopClicked = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const homeElement = document.querySelector("#home");
    if (homeElement) {
      homeElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const handleScrollToBottom = () => {
    if (window.scrollY < 200) {
      setScrollToBottom(true);
    } else {
      setScrollToBottom(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleBackToTop);
    window.addEventListener("scroll", handleScrollToBottom);

    return () => {
      window.removeEventListener("scroll", handleBackToTop);
      window.removeEventListener("scroll", handleScrollToBottom);
    };
  });
  return (
    <>
      {/* Scroll to Bottom */}
      <i
        style={scrollToBottom ? { display: "" } : { display: "none" }}
        className="fa fa-3x fa-angle-down text-secondary scroll-to-bottom"
      ></i>

      {/* Back to Top */}
      <a
        href="#"
        className="btn btn-outline-dark px-0 back-to-top"
        style={backToTop ? { display: "inline" } : { display: "" }}
        onClick={(event) => {
          handleBackToTopClicked(event);
        }}
      >
        <i className="fa fa-angle-double-up"></i>
      </a>
    </>
  );
}
