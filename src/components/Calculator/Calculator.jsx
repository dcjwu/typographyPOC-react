import BooksCalculator from "./Books/BooksCalculator";
import EnvelopesCalculator from "./Envelopes/EnvelopesCalculator";
import PostcardsCalculator from "./Postcards/PostcardsCalculator";
import TotalQuote from "./TotalQuote";

const Calculator = ({calculatorType}) => {
    return (
        <div className='product-calc'>
            {
                calculatorType === 'book'
                    ? <BooksCalculator/>
                    : calculatorType === 'envelope'
                        ? <EnvelopesCalculator/>
                        : calculatorType === 'postcard'
                            ? <PostcardsCalculator/>
                            : null
            }
            {
                calculatorType && <TotalQuote/>
            }
        </div>
    )
}

export default Calculator