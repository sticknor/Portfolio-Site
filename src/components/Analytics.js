import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AnalyticsPageView = () => {
  const location = useLocation();

  useEffect(() => {
    // Send page view event to Google Analytics
    window.gtag("event", "page_view", {
      page_location: location.pathname,
    });

    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default AnalyticsPageView;
