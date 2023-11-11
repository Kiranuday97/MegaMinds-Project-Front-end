import { Link } from "react-router-dom"
import Image from "../images/header.png"
import "../pages/home/Home"


const MainHeader = () => {
  return (
    <header className="main-header">
      <div className="container main__header-container">
      <div className="main__header-left">
  <h4>Shop from the Best Sellers</h4>
  <h1>Discover Countless Products from Trusted Vendors</h1>
  <p>"Uncover a world of options with our extensive collection of high-quality products sourced from a variety of reputable vendors. Your one-stop destination for unique finds."</p>
  {/* <Link to="" className="btn lg">Start Shopping</Link>*/}
</div>

          <div className="main__header-right">
              <div className="main__header-circle">
                <div className="main__header-image">
                  <img src={Image} alt="Main Header Image" />
                </div>
              </div>
          </div>
      </div>
      
 </header>
  )
}

export default MainHeader
