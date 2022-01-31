import { faBookOpen, faEnvelope, faAddressCard, faStickyNote } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames"
import { Link } from "react-router-dom"

const categoryNames = [
   {
      name: "books",
      icon: faBookOpen
   },
   {
      name: "envelopes",
      icon: faEnvelope
   },
   {
      name: "postcards",
      icon: faAddressCard
   },
   {
      name: "labels",
      icon: faStickyNote
   }
].sort((a, b) => a.name.localeCompare(b.name))

const CategoryList = ({ handleClickInside }) => {

   return (
      <div className="sidebar-wrapper">
         <ul className="sidebar-list">
            {categoryNames && categoryNames.map((category, index) => (
               <Link key={`${category.name}_${index}`}
                     className={classNames("link", { "available": category.name === "labels" })} to={`/shop/${category.name}`}>
                  <li onClick={() => {
                     handleClickInside()
                  }}
                  >
                     <FontAwesomeIcon icon={category.icon}/>
                     <span>{category.name}</span>
                  </li>
               </Link>
            ))}
         </ul>
      </div>
   )
}

export default CategoryList