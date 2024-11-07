import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from 'react-router-dom'

export default function NewsCard({
  id,
  title,
  imageUrl,
}) {
  return (
    <Card className="overflow-hidden max-w-sm group">
      <div className="relative flex flex-col h-full">
        {/* Header Banner */}
        <div className="bg-sea-green-400 p-6 text-white">
          <h2 className="text-lg font-semibold leading-tight text-white">
            {title}
          </h2>
        </div>
        
        {/* Main Image */}
        <div className="relative h-48">
          <img
            src={imageUrl}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>

        {/* Continue Reading Button */}
        <CardContent className="p-4">
          <Button 
            variant="link" 
            className="p-0 h-auto font-semibold text-sea-green-400 hover:text-sea-green-500"
            asChild
          >
            <Link to={`/news/${id}`} className="flex items-center gap-1">
              Continue reading
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}