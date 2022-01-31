import { useEffect, useRef } from "react"

import classNames from "classnames"

import SidebarLinks from "./SidebarLinks"

const Sidebar = ({
   toggleNavStatus,
   toggleNavHandler,
   handleLogoutUser
}) => {

   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (toggleNavStatus && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            toggleNavHandler(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [toggleNavStatus])

   const handleClickInside = () => {
      if (toggleNavStatus) {
         toggleNavHandler(false)
      }
   }

   return (
      <div ref={outsideClickRef}
           className={classNames("sidebar bg-white text-center", { "active": toggleNavStatus })}>
         <SidebarLinks handleClickInside={handleClickInside}
                       handleLogoutUser={handleLogoutUser}/>
      </div>
   )
}

export default Sidebar