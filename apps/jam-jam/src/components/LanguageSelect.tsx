import { Select } from "antd";
import { useTranslation } from "react-i18next";

const { Option } = Select;

const LANGUAGES = ["pl", "en"];

const LanguageSelect = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      value={i18n.language}
      onChange={(value) => i18n.changeLanguage(value)}
    >
      {LANGUAGES.map((ln) => (
        <Option key={ln} value={ln}>
          {ln}
        </Option>
      ))}
    </Select>
  );
};

export { LanguageSelect };
