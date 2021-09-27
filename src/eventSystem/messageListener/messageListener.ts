import { FullscriptEnv, getDomain } from "../../fullscript";
import type { FullscriptOptions } from "../../fullscript";
import { Dispatcher } from "../dispatcher";

const initializeMessageListener = (options: FullscriptOptions, dispatcher: Dispatcher): void => {
  const origin = getDomain(options);

  window.addEventListener("message", (e: MessageEvent) => {
    // !!!! Absolutely required for security purposes !!!!!
    // We need to check that the message comes from a valid domain, i.e. fullscript itself
    if (e.origin !== origin) return;

    if (e.data.type === "serverError") {
      throw new Error(e.data.payload.join("\n"));
    }

    dispatcher.dispatch(e.data.type, e.data.payload);
  });
};

export { initializeMessageListener };
