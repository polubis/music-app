import { SwapRightOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Slider } from "antd";
import { Guitar } from "music-core";
import { useToggle } from "dk";
import { useTranslation } from "react-i18next";
import css from "./NotesCountPickerComponent.module.less";

interface NotesCountPickerComponentProps {
  value: number;
  onChange: (count: number) => void;
}

const COUNTS = [4, 8, 12, 16, 20, 24, 28];

const NotesCountPickerComponent = ({
  value,
  onChange,
}: NotesCountPickerComponentProps) => {
  const { isOpen, toggle } = useToggle();

  const { t } = useTranslation();

  return (
    <Dropdown
      destroyPopupOnHide={false}
      visible={isOpen}
      onVisibleChange={toggle}
      overlay={
        <Menu className={css.menu}>
          <Menu.ItemGroup title={t("Notes count")}>
            <Menu.Item className={css.item} key="0">
              {COUNTS.map((count) => (
                <Button
                  key={count}
                  className={css.btn}
                  ghost={value !== count}
                  type="primary"
                  icon={count}
                  onClick={() => onChange(count)}
                />
              ))}
            </Menu.Item>
            <Menu.Item className={css.item} key="1">
              <Slider
                value={value}
                onChange={onChange}
                max={Guitar.MAX_NOTES_COUNT}
                min={Guitar.MIN_NOTES_COUNT}
              />
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      }
      trigger={["click"]}
      placement="bottomLeft"
      arrow
    >
      <Button type="primary" icon={<SwapRightOutlined />} />
    </Dropdown>
  );
};

export { NotesCountPickerComponent };
