import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";

import * as locales from "src/locales/date-time";

function LocaleDatePicker({
  locale = "pt-BR",
  showMonth = "MMM",
  showWeek = "W",
  basicFormat = false,
  ...datePickerProps
}) {
  const [localeAttr, setLocaleAttr] = useState(getLocale());
  const [month, setMonth] = useState();
  const [weekDays, setWeekDays] = useState();

  function getLocale() {
    return Object.values(locales).find((loc) => {
      return loc?.name == locale;
    });
  }

  useEffect(() => {
    if (localeAttr) {
      setMonth(localeAttr.months.map((month) => month[3 - showMonth.length]));
      setWeekDays(localeAttr.weekDays.map((week) => week[3 - showWeek.length]));
    }
  }, [localeAttr]);

  return (
    <DatePicker
      locale={localeAttr}
      months={month}
      weekDays={weekDays}
      format={
        basicFormat ? localeAttr.format.replace(/ -.*/, "") : localeAttr.format
      }
      showOtherDays
      shadow={false}
      {...datePickerProps}
    />
  );
}

export default LocaleDatePicker;
