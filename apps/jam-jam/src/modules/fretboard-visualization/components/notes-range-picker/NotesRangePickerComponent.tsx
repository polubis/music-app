import { ColumnWidthOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Slider } from "antd";
import { useToggle } from "dk";
import { useTranslation } from "react-i18next";
import css from "./NotesRangePickerComponent.module.less";

interface NotesRangePickerComponentProps {
  value: [number, number];
  max: number;
  onChange: (value: [number, number]) => void;
}

const NotesRangePickerComponent = ({
  value,
  max,
  onChange,
}: NotesRangePickerComponentProps) => {
  const { isOpen, toggle } = useToggle();

  const { t } = useTranslation();

  return (
    <Dropdown
      destroyPopupOnHide={false}
      visible={isOpen}
      onVisibleChange={toggle}
      overlay={
        <Menu className={css.menu}>
          <Menu.ItemGroup title={t("Notes range")}>
            <Menu.Item className={css.item} key="0">
              <Slider
                value={value}
                step={1}
                range
                onChange={onChange}
                max={max}
              />
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      }
      trigger={["click"]}
      placement="bottomLeft"
      arrow
    >
      <Button type="primary" icon={<ColumnWidthOutlined />} />
    </Dropdown>
  );
};

export { NotesRangePickerComponent };
