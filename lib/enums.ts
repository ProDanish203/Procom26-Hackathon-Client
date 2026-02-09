export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export enum LoginProvider {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export enum OtpType {
  EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
  PHONE_VERIFICATION = 'PHONE_VERIFICATION',
  PASSWORD_RESET = 'PASSWORD_RESET',
  LOGIN_VERIFICATION = 'LOGIN_VERIFICATION',
  TWO_FACTOR_AUTH = 'TWO_FACTOR_AUTH',
}

export enum OtpChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}
