const loader = {
  base: {
    border: "16px solid white",
    borderTop: "16px solid #88b04b",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
  },
  keyframes: [
    { color: "#fff", transform: "rotate(0deg)" },
    { color: "#000", transform: "rotate(360deg)" },
  ],
  keyframeOptions: {
    duration: 2000,
    easing: "linear",
    iterations: Infinity,
  },
};

const loaderContainer = {
  background: "#EBF0F5",
  width: "100%",
  height: "100%",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const iframeContainer = {
  width: "100%",
  height: "100%",
};

const wrapper = {
  width: "100%",
  height: "100%",
  position: "relative",
};

export { loader, loaderContainer, iframeContainer, wrapper };
