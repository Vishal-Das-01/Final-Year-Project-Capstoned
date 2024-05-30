import React from 'react'
import styles from './ProjectContent.module.css'
import ArcComponent from './_components/ArcComponent/ArcComponent'
import NotFound from '../_components/NotFound/NotFound'

function ProjectContent({project}) {
  return (
      <div className={`h-full w-full py-4`}>
    
          <div className={`${styles.contentHeadingWrapper} pl-2 flex flex-row items-center `}>
  
            <p className={`${styles.contentHeading} font-montserrat font-semibold text-black py-2`}>
              Project Progress
            </p>
  
            <div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 
  
          </div>

          <div className={`relative ${styles.fypProjectWrapper} flex flex-col my-2 items-center justify-center`}>
              <ArcComponent progress={project?.progress || 0}/>
              {project && <h className='absolute text-xl font-medium text-gray-700 bottom-6'>{project.proposal.title}</h>}
          </div>
        
        
      </div>  )
}

export default ProjectContent