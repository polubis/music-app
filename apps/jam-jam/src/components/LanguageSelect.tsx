import { Select } from "antd";
import { SUPPORTED_LNGS } from "i18n";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onChange={(value) => i18n.changeLanguage(value)}
    >
      {SUPPORTED_LNGS.map((ln) => (
        <Option key={ln} value={ln}>
          {ln}
        </Option>
      ))}
    </Select>
  );
};

export { LanguageSelect };
