import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import styles from './Link.module.css';

export const Link = ({ icon, text, goTo }) => {
  return (
    <div className='link' onClick={() => {goTo()}}>
      <p>
        <FontAwesomeIcon icon={icon} className={styles.icon} />
        {text}
      </p>
    </div>
  )
}
