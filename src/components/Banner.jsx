import banner from "../assets/images/banner.png"

const Banner = () => {
   return (
      <div className="banner"> 
         <img alt="banner" src={banner}/>
         <div className="banner-text">
            <h1>Custom online printing for professionals.</h1>
            <p>If you think it, we can print it.</p>
         </div>
      </div>
   )
}

export default Banner