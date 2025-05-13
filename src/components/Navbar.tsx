
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-4 px-6 md:px-12 lg:px-24 bg-white">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src="/placeholder.svg" alt="Growmodo" className="h-8 w-auto" />
        </Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/showcase" className="text-gray-700 hover:text-gray-900">
          Showcase
        </Link>
        <Link to="/talents" className="text-gray-700 hover:text-gray-900">
          Talents
        </Link>
        <Link to="/scope" className="text-gray-700 hover:text-gray-900">
          Scope
        </Link>
        <Link to="/pricing" className="text-gray-700 hover:text-gray-900">
          Pricing
        </Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link to="/apply" className="hidden md:block text-gray-700 hover:text-gray-900">
          Apply as a Talent
        </Link>
        <Button className="bg-black text-white hover:bg-black/90">
          Book a Call
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
