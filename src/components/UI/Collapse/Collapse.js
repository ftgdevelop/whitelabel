import React, { useState, useRef } from "react";

const Collapse = props => {
  const { title, children, name } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <h3 style={{ margin: 0, padding: 0 }}>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          ariaExpanded={isOpen}
          aria-controls={`section-${name}`}
          id={`id-collapse-${name}`}
          style={{
            background: "transparent",
            border: "none",
            textAlign: "right",
            appearance: "none",
            boxSizing: "border-box",
            padding: "0",
            width: "100%"
          }}
        >
          <span>{title}</span>
        </button>
      </h3>
      <div
        id="section-0"
        role="region"
        aria-labelledby={`id-collapse-${name}`}
        style={{
          overflow: "hidden",
          transition: "max-height .1s linear",
          maxHeight: isOpen ? ref.current.offsetHeight : 0
        }}
      >
        <div ref={ref}>
          <fieldset style={{ border: "none", padding: 0, margin: 0 }}>
            <p style={{ margin: 0 }}>{children}</p>
          </fieldset>
        </div>
      </div>
    </>
  );
};

export default Collapse;
