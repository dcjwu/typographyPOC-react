import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import { Carousel } from "react-responsive-carousel"

const GalleryCarousel = ({ images }) => {

   return (
      <Carousel>
         {
            images && images.map(image => (
               <div key={image}>
                  <img alt="Product" src={image}/>
               </div>
            ))
         }
      </Carousel>
   )
}

export default GalleryCarousel