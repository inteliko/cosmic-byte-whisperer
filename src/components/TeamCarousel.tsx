
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "./ui/carousel";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  color: string;
}

const TeamMembers: TeamMember[] = [
  { id: 1, name: "Kristian L.", role: "Wordpress Developer", color: "bg-lime-400" },
  { id: 2, name: "Aira L.", role: "Shopify Developer", color: "bg-white" },
  { id: 3, name: "Aiden M.", role: "Developer", color: "bg-blue-500" },
  { id: 4, name: "Mel R.", role: "Creative Director", color: "bg-white" },
  { id: 5, name: "Joshua B.", role: "UI/UX Designer", color: "bg-blue-500" },
  { id: 6, name: "Zeke S.", role: "Webflow Developer", color: "bg-white" },
  { id: 7, name: "Russel W.", role: "Graphic Designer", color: "bg-teal-400" },
];

const TeamCarousel = () => {
  return (
    <div className="w-full overflow-hidden py-12">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {TeamMembers.map((member) => (
            <CarouselItem key={member.id} className="pl-4 md:basis-1/3 lg:basis-1/5">
              <div className="relative overflow-hidden rounded-lg">
                <div className="h-64 bg-gray-200">
                  <img 
                    src="/placeholder.svg" 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className={`absolute bottom-0 left-0 right-0 p-4 ${member.color} text-black`}>
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-sm">{member.role}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden md:flex">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </div>
  );
};

export default TeamCarousel;
