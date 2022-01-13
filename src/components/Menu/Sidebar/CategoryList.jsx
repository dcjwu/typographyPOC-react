import {Link} from "react-router-dom";

const categoryNames = ['books', 'envelopes', 'postcards']

const CategoryList = ({handleClickInside}) => {
    return (
        <div>
            <ul className="sidebar-list">
                {categoryNames.map((name, index) => (
                    <Link key={`${name}_${index}`} className='link' to='/shop'>
                        <li
                            onClick={handleClickInside}
                        >{name}</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default CategoryList