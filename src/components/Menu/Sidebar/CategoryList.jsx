import {Link} from 'react-router-dom'

const categoryNames = ['books', 'envelopes', 'postcards']

const CategoryList = ({handleClickInside}) => {
   return (
      <div>
         <ul className="sidebar-list">
            {categoryNames && categoryNames.map((category, index) => (
               <Link key={`${category}_${index}`} className="link" to={`/shop/${category}`}>
                  <li
                     onClick={() => {
                        handleClickInside()
                     }}
                  >{category}</li>
               </Link>
            ))}
         </ul>
      </div>
   )
}

export default CategoryList