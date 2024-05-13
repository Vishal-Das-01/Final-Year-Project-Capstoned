import React from 'react'
import styles from './FinalYearGroups.module.css'
import ListTile from './_components/ListTile/ListTile'

export const metadata = {
    title: 'Final Year Groups',
    description: "Capstoned Mentor Groups | Final Year Project (FYP) Management Platform for College & University Students.",
  }

function FinalYearGroups() {
  return (
    <div className={`${styles.container} m-4 overflow-y-auto`}>
        <ListTile
          name="Free Riders"
          group=""
          progress=""
        />
                <ListTile
          name="Free Riders"
          group=""
          progress=""
        />
                <ListTile
          name="Free Riders"
          group=""
          progress=""
        />
                <ListTile
          name="Free Riders"
          group=""
          progress=""
        />
                <ListTile
          name="Free Riders"
          group=""
          progress=""
        />
    </div>
  )
}

export default FinalYearGroups