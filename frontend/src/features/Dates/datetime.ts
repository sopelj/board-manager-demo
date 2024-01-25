const TIME_SPANS: readonly [number, Intl.RelativeTimeFormatUnit][] = [
  [60, 'seconds'],
  [60, 'minutes'],
  [24, 'hours'],
  [7, 'days'],
  [4, 'weeks'],
  [12, 'months'],
];

export const formatTimeSince = (date: Date) => {
  const timeFormatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  let duration = (date.getTime() - new Date().getTime()) / 1000;
  for (const [amount, span] of TIME_SPANS) {
    if (Math.abs(duration) < amount) {
      return timeFormatter.format(Math.round(duration), span);
    }
    duration = duration / amount;
  }
  return timeFormatter.format(Math.round(duration), 'years');
};
