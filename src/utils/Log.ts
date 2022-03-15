export default class Log {

  static log(...args: any[]) {
    console.log(...args)
  }

  static info(...args: any[]) {
    console.info(...args)
  }

  static error(...args: any[]) {
    console.error(...args)
  }

  static warn(...args: any[]) {
    console.warn(...args)
  }

}