interface TestimonialCardProps {
    quote: string
    author: string
  }
  
  export function TestimonialCard({ quote, author }: TestimonialCardProps) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-gray-600 mb-4">"{quote}"</p>
        <p className="font-bold">{author}</p>
      </div>
    )
  }
  
  