enum LogLevel {
  trace,
  debug,
  info,
  warn,
  error,
}
class Log {
  private static _instance: Log;
  private constructor() {
    const env = process.env.ENVIRONMENT as string;
    const levelsMap: Map<string, LogLevel[]> = new Map<string, LogLevel[]>();
    levelsMap.set('Production', [LogLevel.info, LogLevel.error]);
    levelsMap.set('default', [LogLevel.trace, LogLevel.debug, LogLevel.info, LogLevel.warn, LogLevel.error]);
    this.logLevels = levelsMap.get(env) || (levelsMap.get('default') as LogLevel[]);
  }

  private readonly logLevels: LogLevel[];
  static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public trace(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.trace, () => console.trace(message, ...optionalParams));
  }
  public debug(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.debug, () => console.debug(message, ...optionalParams));
  }
  public info(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.info, () => console.info(message, ...optionalParams));
  }
  public warn(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.warn, () => console.warn(message, ...optionalParams));
  }
  public error(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(LogLevel.error, () => console.error(message, ...optionalParams));
  }

  private log(level: LogLevel, logAction: (message?: unknown, ...optionalParams: unknown[]) => void): void {
    if (this.logLevels.find((x) => x === level) !== undefined) {
      logAction();
    }
  }
}

export default Log.Instance;
