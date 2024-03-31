/*
  Generic error for Endpoints
*/

// ---

interface ResponseError {
  response: { status: number }
  message: string
}

// ---

class EndpointError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, EndpointError.prototype);
    this.name = 'EndpointError';
  }
}

// ---

export { EndpointError, ResponseError };
