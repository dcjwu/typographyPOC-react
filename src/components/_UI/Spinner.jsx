import PropTypes from "prop-types"

const Spinner = ({
   width,
   height,
   absolute
}) => {
   return (
      <div className={`d-flex justify-content-center ${absolute ? "position-absolute" : ""}`}>
         <svg enableBackground="new 0 0 0 0"
              id="L9" style={{
                 width: width === undefined ? 200 : width,
                 height: height === undefined ? 200 : height
              }} version="1.1"
              viewBox="0 0 100 100"
              x="0px" xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink" xmlSpace="preserve"
              y="0px">
            <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                  fill="#116fcc">
               <animateTransform attributeName="transform"
                  attributeType="XML"
                  dur="1s"
                  from="0 50 50"
                  repeatCount="indefinite"
                  to="360 50 50"
                  type="rotate"/>
            </path>
         </svg>
      </div>
   )
}

Spinner.propTypes = {
   width: PropTypes.number,
   height: PropTypes.number
}

export default Spinner