class Constants {
  static AUTH_SERVICE_URL = "http://auth-service:5000/api/auth/me";
}

enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
}

enum HttpErrorStatusCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export { Constants, HttpStatusCode, HttpErrorStatusCode };
