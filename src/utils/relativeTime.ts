export const getRelativeTime = (date1: Date, date2: Date) => {
  const dayDiff = Math.ceil(
    (date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24)
  );

  const rtf = new Intl.RelativeTimeFormat("en", {
    style: "short",
  });

  if (dayDiff === 0) {
    const hourDiff = Math.ceil(
      (date2.getTime() - date1.getTime()) / (1000 * 60 * 60)
    );

    if (hourDiff === 0) {
      const minuteDiff = Math.ceil(
        (date2.getTime() - date1.getTime()) / (1000 * 60)
      );

      if (minuteDiff === 0) {
        const secondDiff = Math.ceil(
          (date2.getTime() - date1.getTime()) / 1000
        );

        return rtf.format(secondDiff, "second");
      }

      return rtf.format(minuteDiff, "minute");
    }

    return rtf.format(hourDiff, "hour");
  }

  if (dayDiff > 7) {
    return date2.toLocaleDateString();
  }

  return rtf.format(dayDiff, "day");
};
