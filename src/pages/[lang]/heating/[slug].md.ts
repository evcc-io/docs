import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = () =>
  deviceDetailPaths({
    prefix: "chargers",
    urlType: "heating",
    channel: "release",
    filterType: "heating",
  });

export const GET = deviceMarkdownEndpoint("heating", "heating");
