import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = () =>
  deviceDetailPaths({
    prefix: "chargers",
    urlType: "chargers",
    channel: "release",
    filterType: "charger",
  });

export const GET = deviceMarkdownEndpoint("chargers", "charger");
