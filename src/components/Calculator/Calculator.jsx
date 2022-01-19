import BooksCalculator from './Books/BooksCalculator'
import EnvelopesCalculator from './Envelopes/EnvelopesCalculator'
import LabelsCalculator from './Labels/LabelsCalculator'
import PostcardsCalculator from './Postcards/PostcardsCalculator'

const Calculator = ({calculatorType}) => {
   return (
      <div className="product-calc">
         {
            calculatorType === 'book'
               ? <BooksCalculator/>
               : calculatorType === 'envelope'
                  ? <EnvelopesCalculator/>
                  : calculatorType === 'postcard'
                     ? <PostcardsCalculator/>
                     : calculatorType === 'label'
                        ? <LabelsCalculator/>
                        : null
         }
      </div>
   )
}

export default Calculator