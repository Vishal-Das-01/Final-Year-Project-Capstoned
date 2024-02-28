const AccessType = {
    Public: 'Public',
    Private: 'Private',
};
  
const FileType = {
    JPG: 'jpg',
    PNG: 'png',
    DOC: 'doc',
    PDF: 'pdf',
};
  
const Gender = {
    Male: 'Male',
    Female: 'Female',
};
  
const Status = {
    Pending: 'Pending',
    Confirmed: 'Confirmed',
}; 
  
const Role = {
    Student: 'Student',
    Mentor: 'Mentor',
    Admin: 'Admin',
};

const RequestType = {
    GroupMember: 'Group Member',
    Supervisor: 'Supervisor',
    Mentor: 'Mentor',
};

const Industry = {
    SoftwareEngineering: 'Software Engineering',
    Security: 'Security',
    NetworkSecurity: 'Network Security',
    CloudSecurity: 'Cloud Security',
    ApplicationSecurity: 'Application Security',
    MachineLearning: 'Machine Learning',
    ArtificialIntelligence: 'Artificial Intelligence',
    MobileAppDevelopment: 'Mobile App Development',
    BackendEngineering: 'Backend Engineering',
    FrontendDevelopment: 'Frontend Development',
    Robotics: 'Robotics',
    Devops: 'Devops',
    UIDesigning: 'UI Designing',
    ProjectManagement: 'Project Management',
    DataWarehousing: 'Data Warehousing',
    ComputerVision: 'Computer Vision'
};
  
module.exports = { AccessType, FileType, Gender, Status, Role, RequestType, Industry };
  