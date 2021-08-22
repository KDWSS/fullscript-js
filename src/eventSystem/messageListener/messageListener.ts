import { FullscriptEnv, FULLSCRIPT_DOMAINS } from "../../fullscript";
import { Dispatcher } from "../dispatcher";

const initializeMessageListener = (env: FullscriptEnv, dispatcher: Dispatcher): void => {
  const origin = FULLSCRIPT_DOMAINS[env];

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
