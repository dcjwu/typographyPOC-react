import Button from "../components/_UI/Button";
import bookImage from '../assets/images/book-image.png'
import envelopeImage from '../assets/images/envelope-image.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
    return (
        <div className='container-content'>
            <div className='cart'>
                <div className="cart-wrapper">
                    <div className="cart-item">
                        <div className="cart-item-name">
                            <img src={envelopeImage} alt="ProductIdPage"/>
                            <h5>Envelope 1</h5>
                        </div>
                        <p>10</p>
                        <p>90 EUR</p>
                        <button>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </div>
                    <div className="cart-item">
                        <div className="cart-item-name">
                            <img src={bookImage} alt="ProductIdPage"/>
                            <h5>Book 1</h5>
                        </div>
                        <p>10</p>
                        <p>90 EUR</p>
                        <button>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </button>
                    </div>
                </div>
                <div className="cart-total">
                    <p>Total 100 EUR</p>
                </div>
                <div className="cart-proceed">
                    <Button>Go Back</Button>
                    <Button>Pay Now</Button>
                </div>
            </div>
        </div>
    )
}

export default Cart