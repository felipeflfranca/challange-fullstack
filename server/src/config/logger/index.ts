import * as winston from 'winston'
import 'winston-daily-rotate-file'

const { combine, timestamp, printf, json } = winston.format

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const format = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  json(),
  printf(
    (message) => `[${message.timestamp}] [${message.level.toUpperCase()}] ${message.message}`
  )
)

// Rotate files by minute, hour, day, month, year or weekday.
const fileRotateTransport = new winston.transports.DailyRotateFile({
  extension: process.env.LOG_EXTENSION || '.log',
  utc: process.env.LOG_UTC === 'true' || true,
  datePattern: process.env.LOG_DATEPATTERN || 'yyyy-MM-DD',
  filename: (process.env.LOG_PATH || '') + (process.env.LOG_FILENAME || 'logs/log-%DATE%'),
  zippedArchive: process.env.LOG_ZIPARCHIVE === 'true' || true,
  maxSize: process.env.LOG_MAXSIZE || '20m',
  maxFiles: process.env.LOG_MAXFILE || '14d'
})

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports: [fileRotateTransport]
})

export default Logger
