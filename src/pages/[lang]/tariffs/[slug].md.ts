import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = () =>
  deviceDetailPaths({
    prefix: "tariffs",
    urlType: "tariffs",
    channel: "release",
  });

export const GET = deviceMarkdownEndpoint("tariffs", "tariff");
