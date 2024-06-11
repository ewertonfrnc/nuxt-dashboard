import { DateTime } from "luxon";

class TimeFormatters {
  getOnlyTime(date: Date) {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.TIME_24_SIMPLE);
  }
}

export default new TimeFormatters();
