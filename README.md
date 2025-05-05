# 🚀 Capstoned 🌌

## Description
Capstoned aims to address a critical issue faced by students - the lack of an efficient system for managing their Final Year Projects (FYPs). To alleviate this problem, we propose the development of an innovative FYP Management System. This comprehensive solution will connect students, supervisors, co-supervisors, and industry mentors, fostering seamless collaboration and information exchange.

## Features
| Feature                              | Description                                                                                   |
|--------------------------------------|-----------------------------------------------------------------------------------------------|
| 🛡️ User Authentication and Authorization | Secure login and RBAC ReBAC-based access control for students, supervisors, co-supervisors, and industry mentors. |
| 🤖 Automated Project Assessment       | Utilize AI to assess project ideas and provide instant feedback on reports and presentations. |
| 🔮 Predictive Success Analysis        | Analyze historical data and group members' expertise to help students make informed decisions about their project ideas. |
| 🧠 Unique Idea Detection              | Ensure project ideas within the same batch are unique using AI and historical data analysis. |
| 📡 Real-time Communication            | Facilitate seamless communication among students, supervisors, co-supervisors, and mentors through web sockets. |
| 📂 Document Management                | Securely store, share, and manage essential documents like Software Requirements Specification (SRS) and Software Design Specification (SDS). |
| 📊 Progress Tracking                  | Offer a comprehensive dashboard for tracking project milestones, pending tasks, and deadlines throughout the project lifecycle. |
| 🔄 Peer Review System                 | Promote collaboration among students by facilitating peer reviews to enhance project quality. |
| 🤝 Skill-based Matchmaking            | Develop an algorithm to create project groups based on students' skills and expertise. |
| 📬 Notification System                | Keep all users informed with a comprehensive notification system for project updates and announcements. |
| 📅 Proposal Management                | Allow students to create and submit proposals for approval while monitoring their progress. |
| 🏗️ Admin Control                     | Enable admins to communicate with users, post announcements, set deadlines, manage accounts, and create milestones. |

## Tech Stack
- **Framework**: Next.js (Used for both backend and frontend) 🖥️
- **CSS Framework**: Tailwind CSS 🎨
- **State Management**: Redux 🔄
- **Web Sockets**: Socket.io 📡
- **Database**: MongoDB 📊
- **File Storage**: Firebase Cloud Storage ☁️
- **Natural Language Processing**: LangChain 🧠
- **API Framework**: FastAPI ⚡

## 🛠 My Contributions

In this fork of the Capstoned repo, I was responsible for designing, implementing, and testing the following modules:

1. **AI-Powered Assessment & Success Prediction**  
   - **Files:**  
     - `src/pages/api/assessment.js`  
     - `src/utils/assessmentModel.js`  
   - **What I did:** Trained the ML model, built the prediction API endpoints, and integrated it into the student dashboard.

2. **Skill-Based Team Matching**  
   - **Files:**  
     - `src/utils/teamMatching.js`  
     - `src/pages/api/match.js`  
   - **What I did:** Developed the matching algorithm (K-means + heuristics), defined the MongoDB schema, and exposed REST routes.

3. **Document Workflow UI**  
   - **Files:**  
     - `src/components/Workflow/Chat.js`  
     - `src/components/Workflow/Upload.js`  
     - `src/components/Workflow/DocumentList.js`  
   - **What I did:** Built React/Tailwind components for real-time chat, file uploads, and document versioning.

4. **WebSocket Integration for Real-Time Updates**  
   - **Files:**  
     - `src/pages/api/socket.js`  
   - **What I did:** Configured Socket.io on the backend and wired it up in the front end to push live notifications and chat messages.

5. **LangChain NLP for Idea-Duplication Detection**  
   - **Files:**  
     - `src/utils/langchainDuplication.js`  
   - **What I did:** Integrated LangChain pipelines to scan new proposals against historical data and flag duplicates.

---

> 📌 **Repo link (this fork):**  
> https://github.com/Vishal-Das-01/Final-Year-Project-Capstoned



## Contact
For inquiries, please contact us at capstoned.service@outlook.com. 📧

## Video Demo
https://github.com/user-attachments/assets/efa8d6b5-ca69-4347-8c6f-5d4caf6262c9


