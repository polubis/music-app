import { isEqual } from "lodash";
import { useMemo } from "react";
import { message } from "antd";
import { GuitarStringsFilters, NamedGuitarStringsFilters } from "./defs";
import { useCookies } from "react-cookie";
import { useTranslation } from "react-i18next";

const COOKIE_NAME = "savedFiltersList";

export const useGuitarStringsFiltersSave = (filters: GuitarStringsFilters) => {
  const { t } = useTranslation();

  const [{ savedFiltersList: savedFiltersListCookie }, setCookie] = useCookies([
    COOKIE_NAME,
  ]);
  const savedFiltersList = (savedFiltersListCookie ??
    []) as NamedGuitarStringsFilters[];

  const currentSavedFilters = useMemo(
    () =>
      savedFiltersList.find((savedFilter) =>
        isEqual(savedFilter.filters, filters)
      ),
    [savedFiltersList, filters]
  );
  const areSavedFiltersUsed = !!currentSavedFilters;

  const saveFilters = (): void => {
    if (areSavedFiltersUsed) {
      throw new Error("saveFilters() [SAVING_ALREADY_SAVED_FILTERS]");
    }

    setCookie(COOKIE_NAME, [
      ...savedFiltersList,
      { name: savedFiltersList.length + 1, filters },
    ]);
    message.success(t("Filters has been saved"));
  };

  const removeFilters = (name: string): void => {
    setCookie(
      COOKIE_NAME,
      savedFiltersList.filter((savedFilter) => savedFilter.name !== name)
    );
    message.success(t("Filters has been removed"));
  };

  return {
    savedFiltersList,
    areSavedFiltersUsed,
    currentSavedFilters,
    saveFilters,
    removeFilters,
  };
};
