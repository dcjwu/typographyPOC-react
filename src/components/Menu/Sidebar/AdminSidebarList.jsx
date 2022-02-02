import { faUser, faList } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { NavLink } from "react-router-dom"

const adminPageNames = [
   {
      name: "orders",
      icon: faList
   },
   {
      name: "users",
      icon: faUser
   }
]

const AdminSidebarList = ({ handleClickInside }) => {
   return (
      <div className="sidebar-wrapper">
         <ul className="sidebar-list">
            {adminPageNames && adminPageNames.map((link, index) => (
               <NavLink key={`${link.name}_${index}`}
                     className={classNames("link")} to={`/admin/${link.name}`}>
                  <li onClick={() => {
                     handleClickInside()
                  }}
                  >
                     <FontAwesomeIcon icon={link.icon}/>
                     <span>{link.name}</span>
                  </li>
               </NavLink>
            ))}
         </ul>
      </div>
   )
}

export default AdminSidebarList