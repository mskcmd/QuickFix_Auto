import Header from "../../Components/User/Header";
import image from "../../../public/Designer.png";
import Footer from "../../Components/User/Footer";
import Servicse from "../../Components/User/Servicse";

function Home() {
  return (
    <>
      <Header />
      <div>
        <div className="relative h-[80vh] w-full">
          <img
            className="w-full h-full object-cover"
            src={image}
            alt="Designer"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition duration-300">
            <h1 className="text-4xl font-bold">Welcome to Car Services</h1>
            <h3 className="text-lg">Get reliable service for your car</h3>
          </div>
        </div>
        <div className="bg-white h-[607px] w-full flex justify-center items-center">
          <div className="bg-white w-[80vh]  rounded-2xl drop-shadow-2xl p-6 m-4">
            <h1 className="text-3xl mb-6 text-center">Book Now</h1>
            <form className="">
              <div className="bg-red-500 w-full  ">
                <img className="w-[16%] p-2" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1ii7OoQJvZZeNcG6QepuzHlctNzxjc2cmsA&usqp=CAU"></img>
                
              </div>
              
            </form>
          </div>
        </div>
        <Servicse />
      </div>
      <Footer />
    </>
  );
}

export default Home;
