import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { blogSchema } from "starlight-blog/schema";

const renderSchema = z.object({
  usage: z.string().optional(),
  default: z.string(),
  advanced: z.string().optional(),
});

const productSchema = z.object({
  brand: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v == null ? undefined : String(v))),
  identifier: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v == null ? undefined : String(v))),
  description: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v == null ? "" : String(v))),
  group: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => (v == null ? "" : String(v))),
});

const paramSchema = z
  .object({
    name: z.string().optional(),
    description: z
      .union([z.string(), z.record(z.string(), z.string())])
      .optional(),
    help: z
      .union([z.string(), z.record(z.string(), z.string())])
      .optional()
      .nullable(),
    default: z
      .union([z.string(), z.number(), z.boolean()])
      .optional()
      .nullable(),
    example: z
      .union([z.string(), z.number(), z.boolean()])
      .optional()
      .nullable(),
    unit: z.string().optional().nullable(),
    choice: z.array(z.union([z.string(), z.number()])).optional(),
    required: z.boolean().optional(),
    advanced: z.boolean().optional(),
    deprecated: z.boolean().optional(),
    type: z.string().optional(),
    valuetype: z.string().optional(),
    usages: z.array(z.string()).optional(),
  })
  .passthrough();

const deviceSchema = z.object({
  template: z.string().optional(),
  product: productSchema,
  description: z.string().optional(),
  render: z.array(renderSchema),
  capabilities: z.array(z.string()).optional(),
  requirements: z.array(z.string()).optional(),
  countries: z.array(z.string()).optional(),
  params: z.array(paramSchema).optional(),
});

function deviceCollection(
  locale: "de" | "en",
  type: string,
  channel: "release" | "nightly" = "release",
) {
  return defineCollection({
    loader: glob({
      pattern: "**/*.yaml",
      base: `./templates/${channel}/${locale}/${type}`,
    }),
    schema: deviceSchema,
  });
}

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: (context) => blogSchema(context),
    }),
  }),
  "chargers-de": deviceCollection("de", "charger"),
  "chargers-en": deviceCollection("en", "charger"),
  "meters-de": deviceCollection("de", "meter"),
  "meters-en": deviceCollection("en", "meter"),
  "vehicles-de": deviceCollection("de", "vehicle"),
  "vehicles-en": deviceCollection("en", "vehicle"),
  "tariffs-de": deviceCollection("de", "tariff"),
  "tariffs-en": deviceCollection("en", "tariff"),
  "chargers-nightly-de": deviceCollection("de", "charger", "nightly"),
  "chargers-nightly-en": deviceCollection("en", "charger", "nightly"),
  "meters-nightly-de": deviceCollection("de", "meter", "nightly"),
  "meters-nightly-en": deviceCollection("en", "meter", "nightly"),
  "vehicles-nightly-de": deviceCollection("de", "vehicle", "nightly"),
  "vehicles-nightly-en": deviceCollection("en", "vehicle", "nightly"),
  "tariffs-nightly-de": deviceCollection("de", "tariff", "nightly"),
  "tariffs-nightly-en": deviceCollection("en", "tariff", "nightly"),
};
