import React from 'react'
import ListTile from './_components/LT/ListTile'
import styles from './CurrentProjects.module.css'
import { cookies } from 'next/headers';
import { callAPI } from '@/utils/helpers/callAPI';
import { FRONTEND_ROUTES } from '@/utils/routes/frontend_routes';
import { HttpStatusCode } from 'axios';
import { BACKEND_ROUTES } from '@/utils/routes/backend_routes';
import { redirect } from 'next/dist/server/api-utils';
import NotFound from '../_components/NotFound/NotFound';

export const metadata = {
  title: 'Final Year Projects: Current',
  description: "Capstoned Mentor Current Projects | Final Year Project (FYP) Management Platform for College & University Students.",
}

async function CurrentProjects() {
  const projects = await getProjects();

  // const projects = [
  //   { name: 'FYP Management System', group: 'IBA Group', progress: 100 },
  //   { name: 'E-commerce Website', group: 'Web Development Team', progress: 80 },
  //   { name: 'Data Analysis Tool', group: 'Data Science Team', progress: 60 },
  //   { name: 'Mobile App Development', group: 'App Development Team', progress: 90 },
  //   { name: 'Research Paper on AI Ethics', group: 'Research Team', progress: 70 }
  // ];

  return (
    <div className={`${styles.container} m-4 overflow-y-auto`}>
      {projects.length === 0 && <NotFound/>}
      {projects.map((project, index) => (
        <ListTile
          key={index}
          projectID={project.projectID}
          title={project.projectTitle}
          group={project.groupName}
          progress={project.progress}
          year={project.year}
        />
      ))}
    </div>
  );
}


export default CurrentProjects

async function getProjects() {
  const accessToken = cookies().get('accessToken')?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    BACKEND_ROUTES.getAllMentorProjects
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData.data;
  } else if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}