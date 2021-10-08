import loadable from "@loadable/component";
import { Button } from "antd";
import { useToggle } from "dk";
import { useTranslation } from "react-i18next";

const ChangelogModal = loadable(() => import("./ChangelogModal"), {
  resolveComponent: (imported) => imported.ChangelogModal,
});

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
