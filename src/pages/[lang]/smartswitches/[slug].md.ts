import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = () =>
  deviceDetailPaths({
    prefix: "chargers",
    urlType: "smartswitches",
    channel: "release",
    filterType: "smartswitch",
  });

export const GET = deviceMarkdownEndpoint("smartswitches", "smartswitch");
