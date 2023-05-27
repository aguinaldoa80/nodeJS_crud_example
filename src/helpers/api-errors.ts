export class ApiError extends Error {
  public readonly statusCode: number

  constructor(message: string, status: number){
    super(message)
    this.statusCode = status;
  }
}

export class BadRequestError extends ApiError {
  constructor(message: string){
    super(message, 400)
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string){
    super(message, 404)
  }
}

export class DuplicityError extends ApiError {
  constructor(message: string){
    super(message, 409)
  }
}