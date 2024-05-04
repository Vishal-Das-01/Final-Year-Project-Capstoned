const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export const BACKEND_ROUTES = {
  login: `${baseURL}/auth/login`,
  logout: `${baseURL}/auth/logout`,
  refresh: `${baseURL}/auth/refresh`,
  sendRequest: 'http://localhost:3000/api/student/request/send',
  getProfile: `${baseURL}/user/account/get`,
  getProposalsMentor: `${baseURL}/mentor/proposal/get`,
};
