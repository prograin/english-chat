export class ErrorUtil extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true;
  }
}
