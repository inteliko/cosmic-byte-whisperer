
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "./ui/sheet";

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Helper function to determine active state
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-4 left-4 right-4 z-50">
      <nav className="flex items-center justify-between py-4 px-6 md:px-12 lg:px-24 bg-white rounded-lg shadow-md">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/placeholder.svg" alt="Growmodo" className="h-8 w-auto" />
          </Link>
        </div>
        
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-6 mt-10">
                <Link 
                  to="/showcase" 
                  className={`text-lg font-medium ${isActive('/showcase') ? 'text-primary' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Showcase
                </Link>
                <Link 
                  to="/talents" 
                  className={`text-lg font-medium ${isActive('/talents') ? 'text-primary' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Talents
                </Link>
                <Link 
                  to="/scope" 
                  className={`text-lg font-medium ${isActive('/scope') ? 'text-primary' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Scope
                </Link>
                <Link 
                  to="/pricing" 
                  className={`text-lg font-medium ${isActive('/pricing') ? 'text-primary' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  to="/apply" 
                  className={`text-lg font-medium ${isActive('/apply') ? 'text-primary' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  Apply as a Talent
                </Link>
                <Button className="bg-black text-white hover:bg-black/90 w-full">
                  Book a Call
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/showcase" className={`${isActive('/showcase') ? 'text-primary font-medium' : 'text-gray-700 hover:text-gray-900'}`}>
                Showcase
              </Link>
              <Link to="/talents" className={`${isActive('/talents') ? 'text-primary font-medium' : 'text-gray-700 hover:text-gray-900'}`}>
                Talents
              </Link>
              <Link to="/scope" className={`${isActive('/scope') ? 'text-primary font-medium' : 'text-gray-700 hover:text-gray-900'}`}>
                Scope
              </Link>
              <Link to="/pricing" className={`${isActive('/pricing') ? 'text-primary font-medium' : 'text-gray-700 hover:text-gray-900'}`}>
                Pricing
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/apply" className={`hidden md:block ${isActive('/apply') ? 'text-primary font-medium' : 'text-gray-700 hover:text-gray-900'}`}>
                Apply as a Talent
              </Link>
              <Button className="bg-black text-white hover:bg-black/90">
                Book a Call
              </Button>
            </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
