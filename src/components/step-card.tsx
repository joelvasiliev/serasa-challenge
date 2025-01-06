interface StepCardProps {
    number: number
    title: string
    description: string
  }
  
  export function StepCard({ number, title, description }: StepCardProps) {
    return (
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center text-xl font-bold mb-4">
          {number}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    )
  }
  
  