export interface LoginResponseDTO {
  token: string;
  refreshToken?: string;
  resetPassword?: boolean;
}
