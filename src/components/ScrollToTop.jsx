import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0 });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const app = document.querySelector(".App");
      if (app && app.scrollTo) app.scrollTo({ top: 0, left: 0, behavior: "instant" });

      const main = document.querySelector("main");
      if (main && main.scrollTo) main.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
  }, [pathname]);

  return null;
}
