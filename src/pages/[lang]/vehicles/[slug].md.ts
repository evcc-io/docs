import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = () =>
  deviceDetailPaths({
    prefix: "vehicles",
    urlType: "vehicles",
    channel: "release",
  });

export const GET = deviceMarkdownEndpoint("vehicles", "vehicle");
