import styles from './dbconncard.module.scss'
import React, { useState } from 'react'
import { DBConnection } from '../../../data/models'
import Constants from '../../../constants'
import Link from 'next/link'
import OutsideClickHandler from 'react-outside-click-handler'

type DBConnCardPropType = { 
    dbConn: DBConnection
    isAdmin: Boolean
    onDeleteDB: (dbConnId: string) => void
}

const DBConnCard = ({dbConn, isAdmin, onDeleteDB}: DBConnCardPropType) => {

    const [showDropdown, setShowDropdown] = useState(false)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }

    return (
        <div className={"card "+styles.cardContainer}>
            <Link href={Constants.APP_PATHS.DB.path} as={Constants.APP_PATHS.DB.path.replace('[id]', dbConn.id)}>
                <a className={styles.cardLink}>
                    <div className={"card-content "+styles.cardContent}>
                        <b>{dbConn.name}</b>
                        { isAdmin && 
                            <div className="dropdown is-active" onClick={(e)=>{e.preventDefault()}}>
                                <div className="dropdown-trigger">
                                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdown}>
                                        <span className="icon is-small">
                                            <i className="fas fa-ellipsis-v" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                {showDropdown && 
                                    <OutsideClickHandler onOutsideClick={()=>{setShowDropdown(false)}}>
                                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                            <div className="dropdown-content">
                                                <a onClick={()=>{onDeleteDB(dbConn.id)}} className="dropdown-item">
                                                    Delete DB
                                                </a>
                                            </div>
                                        </div>
                                    </OutsideClickHandler>
                                }
                            </div> 
                        }
                    </div>
                </a>
            </Link>
        </div>

    )
}


export default DBConnCard