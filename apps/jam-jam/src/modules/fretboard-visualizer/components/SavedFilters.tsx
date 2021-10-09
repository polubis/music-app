import { Typography, Button, Tag, Empty, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { GuitarStringsFilters, useGuitarStringsFiltersSave } from "../models";

import css from "./SavedFilters.module.less";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

interface SavedFiltersProps {
  filters: GuitarStringsFilters;
  onApply: (filters: GuitarStringsFilters) => void;
}

const SavedFilters = ({ filters, onApply }: SavedFiltersProps) => {
  const { t } = useTranslation();

  const {
    saveFilters,
    currentSavedFilters,
    savedFiltersList,
    areSavedFiltersUsed,
    removeFilters,
  } = useGuitarStringsFiltersSave(filters);

  return (
    <>
      <div className={css.tile}>
        {savedFiltersList.length > 0 ? (
          <>
            <header className={css.tileHeader}>
              <Title level={5}>{t("Saved filters")}</Title>
              <Button
                type="primary"
                disabled={areSavedFiltersUsed}
                onClick={saveFilters}
              >
                {t("Save")}
              </Button>
            </header>
            <div className={css.tags}>
              {savedFiltersList.map((savedFilters, idx) => (
                <Tag
                  closable
                  key={savedFilters.name}
                  onClick={() => onApply(savedFilters.filters)}
                  onClose={(e) => e.preventDefault()}
                  closeIcon={
                    <Popconfirm
                      title={t("Are you sure to delete these filters") + '?'}
                      onConfirm={() => removeFilters(savedFilters.name)}
                      okText={t("Yes")}
                      cancelText={t("No")}
                    >
                      <CloseOutlined />
                    </Popconfirm>
                  }
                  color={
                    currentSavedFilters?.name === savedFilters.name
                      ? "green"
                      : "geekblue"
                  }
                >
                  {t("Filters")} {savedFilters.name}
                </Tag>
              ))}
            </div>
          </>
        ) : (
          <Empty
            imageStyle={{
              height: 60,
            }}
            description={
              <Text className={css.noSavedFilters}>
                {t("No saved filters yet")}?
              </Text>
            }
          >
            <Button
              type="primary"
              disabled={areSavedFiltersUsed}
              onClick={saveFilters}
            >
              {t("Save filters")}
            </Button>
          </Empty>
        )}
      </div>
    </>
  );
};

export { SavedFilters };
