const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export const BACKEND_ROUTES = {
  login: `${baseURL}/auth/login`,
  logout: `${baseURL}/auth/logout`,
  refresh: `${baseURL}/auth/refresh`,
  sendRequest: 'http://localhost:3000/api/student/request/send',
  getProfile: `${baseURL}/user/account/get`,
  getAllCompanies: `${baseURL}/user/company/get/all`, // (user) companies

  updateProfileMentor: `${baseURL}/mentor/account/update`,
  updateProposalLinkMentor: `${baseURL}/mentor/proposal/updateLink`,
  deleteProposalMentor: `${baseURL}/mentor/proposal/delete`,
  getProposalsMentor: `${baseURL}/mentor/proposal/get`,
  createProposalMentor: `${baseURL}/mentor/proposal/create`,
  getMentorGroups: `${baseURL}/mentor/group/get/all`,
  getMentorGroupDetails: `${baseURL}/mentor/group/get/`,
  
  getGroupSelectedProposal: `${baseURL}/user/group/selected-proposal/get-all`,

  getReceivedRequest: `${baseURL}/user/request/get/received`,
  getGroupDetails: `${baseURL}/user/group/get`,
  deleteRequest: `${baseURL}/user/request/decline`,
  acceptRequest: `${baseURL}/user/request/accept`,

  getAllMilestones: `${baseURL}/admin/milestone/get-all`, // (admin) milestones
  createMilestone: `${baseURL}/admin/milestone/create`, // (admin) milestones

  createUser: `${baseURL}/admin/account/create`, // (admin) users
  getUsers: `${baseURL}/admin/user/get/`, // (admin) users

  getAllProjects: `${baseURL}/admin/project/get-all`, // (admin) projects
  markProjectFinished: `${baseURL}/admin/project/mark-finished/`, // (admin) projects

  getFYPGroups: `${baseURL}/admin/group/get/all`, // (admin) fyp groups
  finalizeAllFYPGroups: `${baseURL}/admin/group/finalize/all`, // (admin) fyp groups

  getAnnouncements: `${baseURL}/admin/notification/get/`, // (admin) announcements
  createAnnouncement: `${baseURL}/admin/notification/create`, // (admin) announcements

  createCompany: `${baseURL}/admin/company/create`, // (admin) companies
};
