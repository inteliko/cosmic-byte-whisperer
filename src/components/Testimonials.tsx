
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "I have been working with Growmodo for nearly two years now. With their keen eye for design, development skills, and expert project management, I have managed to serve a lot more clients than I would without them.",
    author: "Gaute Remen",
    role: "Tech Lead",
    company: "Synlignet"
  },
  {
    id: 2,
    content: "The Growmodo team is always on top of things with replies and communicating how things are going.",
    author: "Lauren Gilmore",
    role: "VP Media",
    company: "Hyperfocal"
  }
];

const Testimonials = () => {
  return (
    <div className="py-16 px-6 md:px-12 lg:px-24">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="flex flex-col md:flex-row gap-6 mb-16">
          <div className="md:w-1/4 flex justify-center">
            <div className="w-40 h-40 bg-gray-200 rounded-md overflow-hidden">
              <img src="/placeholder.svg" alt={testimonial.author} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:w-3/4">
            <p className="text-lg mb-4">"{testimonial.content}"</p>
            <div className="flex mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-yellow-400 text-yellow-400 w-5 h-5" />
              ))}
            </div>
            <h3 className="font-bold">{testimonial.author}</h3>
            <p className="text-gray-600">{testimonial.role}, {testimonial.company}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
