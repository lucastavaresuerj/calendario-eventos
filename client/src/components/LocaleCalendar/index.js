import React, { useState, useEffect } from "react";
import { Calendar } from "react-multi-date-picker";

import * as locales from "./locales";

function LocaleCalendar({
  locale = "pt-BR",
  showMonth = "MMM",
  showWeek = "W",
  ...calendarProps
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
    <Calendar
      locale={localeAttr}
      months={month}
      weekDays={weekDays}
      showOtherDays
      shadow={false}
      {...calendarProps}
    />
  );
}

export default LocaleCalendar;
