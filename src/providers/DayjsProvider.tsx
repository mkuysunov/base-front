import "dayjs/locale/ru";
import "dayjs/locale/tg";

import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function DayjsProvider() {
  const { i18n } = useTranslation();
  const locale = i18n.language;

  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  return null;
}
