import React from 'react'
import styles from './ProjectContent.module.css'
import ProjectProgressBar from './_components/ProjectProgressBar/ProjectProgressBar'

function ProjectContent() {
  return (
      <div className={`h-full w-full mx-2 my-4`}>
    
          <div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>
  
            <p className={`${styles.contentHeading} font-montserrat font-semibold text-black py-2`}>
              Project Progress
            </p>
  
            <div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 
  
          </div>
  
          <div className={`${styles.fypProjectWrapper} flex flex-col my-2 items-center justify-start`}>
            {/* <h>Title: <span className={`text-blue-500 font-semibold`}>Project Title</span></h> */}
              <ProjectProgressBar progress={65}/>
          </div>
        
        
      </div>  )
}

export default ProjectContent