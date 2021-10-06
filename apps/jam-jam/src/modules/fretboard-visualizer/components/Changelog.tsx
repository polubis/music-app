import { Button } from "antd";
import { useToggle, withLazy } from "dk";
import { useTranslation } from "react-i18next";

const ChangelogModal = withLazy(() =>
  import("./ChangelogModal").then((m) => ({ default: m.ChangelogModal }))
);

const Changelog = () => {
  const { t } = useTranslation();
  const [open, { toggle }] = useToggle();

  return (
    <>
      <Button type="primary" onClick={toggle}>
        {t("Changelog")}
      </Button>
      {open && <ChangelogModal onOk={toggle} onCancel={toggle} />}
    </>
  );
};

export { Changelog };
