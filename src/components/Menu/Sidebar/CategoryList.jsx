import classNames from 'classnames'
import {Link} from 'react-router-dom'

const categoryNames = ['books', 'envelopes', 'postcards', 'labels'].sort()

const CategoryList = ({handleClickInside}) => {
   return (
      <div>
         <ul className="sidebar-list">
            {categoryNames && categoryNames.map((category, index) => (
               <Link key={`${category}_${index}`} className={classNames('link', {
                  'available': category === 'labels'
               })} to={`/shop/${category}`}>
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