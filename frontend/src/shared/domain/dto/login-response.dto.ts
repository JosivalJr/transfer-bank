export interface ILoginResponseDTO {
  token: string;
  refreshToken?: string;
  resetPassword?: boolean;
}
