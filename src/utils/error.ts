export class ConflictError extends Error {
  public status;
  constructor(public message: string) {
    super(message);
    this.message = message;
    this.status = 409;
  }
}

export class NotFoundError extends Error {
  public status;
  constructor(public message: string) {
    super(message);
    this.message = message;
    this.status = 404;
  }
}

export class BadRequestError extends Error {
  public status;
  constructor(public message: string) {
    super(message);
    this.message = message;
    this.status = 400;
  }
}
export class GoneError extends Error {
  public status;
  constructor(public message: string) {
    super(message);
    this.message = message;
    this.status = 410;
  }
}
