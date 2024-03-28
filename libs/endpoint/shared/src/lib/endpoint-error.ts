/*
  Generic error for Endpoints
*/

// ---

class EndpointError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, EndpointError.prototype);
    this.name = 'EndpointError';
  }
}

// ---

export { EndpointError };
