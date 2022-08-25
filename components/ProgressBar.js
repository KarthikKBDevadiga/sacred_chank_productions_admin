import React from 'react'
import styles from '../styles/Progress.module.css'

const ProgressBar = () => {
  return (
    <div className={styles.loader}>
      <svg className={styles.circular}>
        <circle className={styles.path} cx="50" cy="50" r="20" fill="none" strokeWidth="5" strokeMiterlimit="10"></circle>
      </svg>
    </div>
  )
}

export default ProgressBar
