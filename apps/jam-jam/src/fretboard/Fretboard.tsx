import { Button } from "antd";
import React from "react";

import css from "./Fretboard.scss";

const Fretboard = () => {
  return (
    <div className={css.fretboard}>
      <Button type="primary">Test</Button>
    </div>
  );
};

export { Fretboard };
