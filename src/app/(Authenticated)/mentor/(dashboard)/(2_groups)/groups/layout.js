import React from 'react'
import styles from './MyGroups.module.css'
import TabButtons from './_components/Tab Buttons/TabButtons'

function GroupPageLayout({ children }) {

  return (
    <div
      className={`${styles.contentCardTitleContainer} p-3 my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="flex flex-row items-center py-2 mr-5 w-auto justify-start">
        <h1
          className={`${styles.contentHeading} font-semibold text-black`}
        >
          Groups
        </h1>
        <div
          className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
        />

      </div>
        
      <div className='m-5'>
        <TabButtons />
        {children}
      </div>

    </div>
  )
}

export default GroupPageLayout