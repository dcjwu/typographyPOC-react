import classNames from 'classnames'
import {useEffect, useRef} from 'react'
import SidebarLinks from './SidebarLinks'

const Sidebar = ({toggleNavStatus, toggleNavHandler, handleLogoutUser}) => {

   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (toggleNavStatus && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            toggleNavHandler(false)
         }
      }
      document.addEventListener('click', checkIfClickedOutside)
      return () => {
         document.removeEventListener('click', checkIfClickedOutside)
      }
   }, [toggleNavStatus])

   const handleClickInside = () => {
      if (toggleNavStatus) {
         toggleNavHandler(false)
      }
   }

   return (
      <div ref={outsideClickRef} className={classNames('sidebar bg-light text-center p-3', {
         'active': toggleNavStatus
      })}>
         <SidebarLinks handleClickInside={handleClickInside} handleLogoutUser={handleLogoutUser}/>
      </div>
   )
}

export default Sidebar