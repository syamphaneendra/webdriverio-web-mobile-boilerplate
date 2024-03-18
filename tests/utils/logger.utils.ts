import { createLogger, transports, format } from 'winston';

// Create a logger instance
const logger = createLogger({
  level: 'info', // Set the default log level
  format: format.combine(
    format.timestamp(), // Add timestamp to log entries
    format.simple()
  ),
  transports: [
    // Output logs to console
    new transports.Console(),
  ],
});

export default logger;
