import { getContainerRenderer } from "@astrojs/react/container-renderer";
import {
  type ContainerRenderOptions,
  experimental_AstroContainer as AstroContainer,
} from "astro/container";
import { loadRenderers } from "astro:container";
import { JSDOM } from "jsdom";

export async function renderToDOM(
  component: import("astro/runtime/server/index.js").AstroComponentFactory,
  options?: ContainerRenderOptions,
) {
  const renderers = await loadRenderers([getContainerRenderer()]);
  const container = await AstroContainer.create({ renderers });
  const html = await container.renderToString(component, options);
  const window = new JSDOM(html).window;
  const dom = window.document;
  return { dom, window, html };
}
