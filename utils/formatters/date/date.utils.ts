class DateFormatters {
  locale = navigator.language;
  options: Intl.DateTimeFormatOptions = {};

  getDateNumber(date: Date) {
    return new Date(date).getDate();
  }

  formatDate(date: Date) {
    const formattedDate = new Intl.DateTimeFormat(
      this.locale,
      this.options,
    ).format(date);

    return formattedDate;
  }
}

export default new DateFormatters();
