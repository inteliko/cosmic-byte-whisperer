
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

const SelectedWork = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-12 lg:px-24">
      <div className="flex justify-between items-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold">
          Selected Work<br />
          From Our Talents
        </h2>
        
        <div className="hidden md:flex gap-4">
          <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">
            &#8592;
          </button>
          <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">
            &#8594;
          </button>
        </div>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {[...Array(3)].map((_, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-white h-72">
                <img 
                  src="/placeholder.svg" 
                  alt={`Project ${i+1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default SelectedWork;
