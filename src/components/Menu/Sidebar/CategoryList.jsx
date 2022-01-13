import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getFilteredProducts} from "../../../redux/products/products.actions";

const categoryNames = ['books', 'envelopes', 'postcards']

const CategoryList = ({handleClickInside}) => {
    const dispatch = useDispatch()
    const handleSelectCategory = category => dispatch(getFilteredProducts(category))

    return (
        <div>
            <ul className="sidebar-list">
                {categoryNames && categoryNames.map((category, index) => (
                    <Link key={`${category}_${index}`} className='link' to='/shop'>
                        <li
                            onClick={() => {
                                handleClickInside();
                                handleSelectCategory(category)
                            }}
                        >{category}</li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default CategoryList