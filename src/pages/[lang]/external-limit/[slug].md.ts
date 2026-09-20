import { deviceDetailPaths, deviceMarkdownEndpoint } from "@utils/devices";

export const getStaticPaths = async () => [
  ...(await deviceDetailPaths({
    prefix: "hems",
    urlType: "external-limit",
    channel: "release",
  })),
  ...(await deviceDetailPaths({
    prefix: "curtailers",
    urlType: "external-limit",
    channel: "release",
  })),
];

export const GET = deviceMarkdownEndpoint("external-limit", (entry: any) =>
  entry.collection.startsWith("curtailers") ? "curtailer" : "hems",
);
