import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = () =>
  deviceDetailPaths({
    prefix: "tempsensors",
    urlType: "temperature",
    channel: "release",
  });

export const GET = deviceMarkdownEndpoint("temperature", "tempsensor");
