import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = () =>
  deviceDetailPaths({
    prefix: "messengers",
    urlType: "notifications",
    channel: "release",
  });

export const GET = deviceMarkdownEndpoint("notifications", "messenger");
