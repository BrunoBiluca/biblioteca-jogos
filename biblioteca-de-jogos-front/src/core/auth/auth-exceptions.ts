export class UserNotFoundException extends Error {
  constructor() {
    super('User not found');
  }
}

export class InvalidCredentialsException extends Error {
  constructor() {
    super('Invalid credentials');
  }
}

export class UserAlreadyExistsException extends Error {
  constructor() {
    super('User already exists');
  }
}

export class UserNotConfirmedException extends Error {
  constructor() {
    super('User not confirmed');
  }
}
