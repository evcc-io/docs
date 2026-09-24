import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = () =>
  deviceDetailPaths({
    prefix: "meters",
    urlType: "meters",
    channel: "release",
  });

export const GET = deviceMarkdownEndpoint("meters", "meter");
