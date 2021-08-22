import { createWrapper, createLoaderContainer, createIframeContainer } from "./containers";

const removeLoader = (): void => {
  const loaderContainer = document.getElementById("loaderContainer");
  loaderContainer.style.display = "none";
};

const wrapWithLoader = (iframe: HTMLIFrameElement): HTMLDivElement => {
  const iframeContainer = createIframeContainer();
  iframeContainer.appendChild(iframe);

  iframe.onload = removeLoader;

  const wrapper = createWrapper();
  const loaderContainer = createLoaderContainer();
  wrapper.appendChild(loaderContainer);
  wrapper.appendChild(iframeContainer);

  return wrapper;
};

export { wrapWithLoader };
