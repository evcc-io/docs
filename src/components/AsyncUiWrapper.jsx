import AsyncApiComponent from "@asyncapi/react-component";

const configs = {};
const customCss = "";

export default () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current?.attachShadow) {
      try {
        const shadowRoot = containerRef.current.attachShadow({ mode: "open" });
        const style = document.createElement("style");
        style.textContent = customCss;
        shadowRoot.appendChild(style);

        const div = document.createElement("div");
        shadowRoot.appendChild(div);

        const root = ReactDOM.createRoot(div);
        root.render(
          <AsyncApiComponent
            schema={{ url: "/mqtt-api.yaml" }}
            config={configs}
          />,
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return <div ref={containerRef}></div>;
};
