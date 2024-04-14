export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  description: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
