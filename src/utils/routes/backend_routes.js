const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export const BACKEND_ROUTES = {
  login: `${baseURL}/auth/login`,
  logout: `${baseURL}/auth/logout`,
  refresh: `${baseURL}/auth/refresh`,
  sendRequest: 'http://localhost:3000/api/student/request/send',
  getProfile: `${baseURL}/user/account/get`,
  getProposalsMentor: `${baseURL}/mentor/proposal/get`,
  createProposalMentor: `${baseURL}/mentor/proposal/create`,
  getAllCompanies: `${baseURL}/user/company/get/all`,
  updateProfileMentor: `${baseURL}/mentor/account/update`,
  updateProposalLinkMentor: `${baseURL}/mentor/proposal/updateLink`,
  deleteProposalMentor: `${baseURL}/mentor/proposal/delete`,
  getAllMilestones: `${baseURL}/admin/milestone/get-all`,
  createMilestone: `${baseURL}/admin/milestone/create`,
  createUser: `${baseURL}/admin/account/create`,
};
