import { Typography, Button, Tag, Empty, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { GuitarStringsFilters, useGuitarStringsFiltersSave } from "../models";

import css from "./SavedFilters.module.less";

const { Title, Text } = Typography;

interface SavedFiltersProps {
  filters: GuitarStringsFilters;
  onApply: (filters: GuitarStringsFilters) => void;
}

const SavedFilters = ({ filters, onApply }: SavedFiltersProps) => {
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
              <Title level={5}>Saved filters</Title>
              <Button
                type="primary"
                disabled={areSavedFiltersUsed}
                onClick={saveFilters}
              >
                Save
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
                      title={`Are you sure to delete ${savedFilters.name}`}
                      onConfirm={() => removeFilters(savedFilters.name)}
                      okText="Yes"
                      cancelText="No"
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
                  {savedFilters.name}
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
              <Text className={css.noSavedFilters}>No saved filters yet?</Text>
            }
          >
            <Button
              type="primary"
              disabled={areSavedFiltersUsed}
              onClick={saveFilters}
            >
              Save filters
            </Button>
          </Empty>
        )}
      </div>
    </>
  );
};

export { SavedFilters };
