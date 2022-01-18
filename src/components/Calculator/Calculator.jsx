import BooksCalculator from './Books/BooksCalculator'
import EnvelopesCalculator from './Envelopes/EnvelopesCalculator'
import PostcardsCalculator from './Postcards/PostcardsCalculator'
import LabelsCalculator from './Labels/LabelsCalculator'

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