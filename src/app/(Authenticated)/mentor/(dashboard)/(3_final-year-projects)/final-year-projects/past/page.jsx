import React from 'react'
import ListTile from './_components/ListTile/ListTile'
import styles from './PastProjects.module.css'

export const metadata = {
  title: 'Final Year Projects: Past',
  description: "Capstoned Mentor Current Projects | Final Year Project (FYP) Management Platform for College & University Students.",
}

function PastProjects() {
  const projects = [
    { name: 'FYP Management System', group: 'IBA Group', progress: 100 },
    { name: 'E-commerce Website', group: 'Web Development Team', progress: 80 },
    { name: 'Data Analysis Tool', group: 'Data Science Team', progress: 60 },
    { name: 'Mobile App Development', group: 'App Development Team', progress: 90 },
    { name: 'Research Paper on AI Ethics', group: 'Research Team', progress: 70 }
  ];

  return (
    <div className={`${styles.container} m-4 overflow-y-auto`}>
      {projects.map((project, index) => (
        <ListTile
          key={index}
          name={project.name}
          group={project.group}
          progress={project.progress}
        />
      ))}
    </div>
  );
}


export default PastProjects