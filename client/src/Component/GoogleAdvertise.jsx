import React, { useEffect } from "react";

const GoogleAdvertise = ({
  className = "adsbygoogle",
  client = "",
  slot = "",
  format = "",
  responsive = "",
}) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("Advertise is pushed");
    } catch (e) {
      if (process.env.NODE_ENV !== "production")
        console.error("AdvertiseError", e);
    }
  }, []);
  if (process.env.NODE_ENV !== "production") return <div>광고 표시 영역</div>;
  //production인 경우 구글 광고 표시
  return (
    <ins
      className={className}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
    />
  );
};
export default GoogleAdvertise;
