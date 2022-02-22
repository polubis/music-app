import { ScaleNotesComponent } from "./ScaleNotesComponent";
import { Button } from "antd";
import { SmallDashOutlined } from "@ant-design/icons";

import css from "./ScalePickerComponent.module.less";

const ScalePickerComponent = () => {
  return (
    <div className={css.root}>
      <ScaleNotesComponent />
      <Button type="primary" icon={<SmallDashOutlined />} />
    </div>
  );
};

export { ScalePickerComponent };
