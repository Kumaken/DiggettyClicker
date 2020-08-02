export enum DISPLAY_MODE {
  SECOND = 0,
  MINUTE = 1,
  HOUR = 2
}

export default class TimerUtil {
  static readonly DISPLAY_MODE = DISPLAY_MODE;

  /**
   * Converts time in second to string to be displayed in text objects
   * @param time Time in second
   * @param mode Display mode, (HOUR: hh:mm:ss, MINUTE: mm:ss, SECOND: ss)
   */
  static convertTime(
    ptime: number,
    mode: DISPLAY_MODE = DISPLAY_MODE.SECOND
  ): string {
    let text = '';
    let time = ptime;

    if (mode >= DISPLAY_MODE.HOUR) {
      const hour = Math.floor(time / 3600);
      if (hour < 10) text += '0';
      text += `${hour.toString()}:`;
      time %= 3600;
    }

    if (mode >= DISPLAY_MODE.MINUTE) {
      const minute = Math.floor(time / 60);
      if (minute < 10) text += '0';
      text += `${minute.toString()}:`;
      time %= 60;
    }

    if (time < 10) text += '0';
    text += Math.floor(time);

    return text;
  }
}
