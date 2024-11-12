import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from 'react-router-dom'

export default function NewsCard({
  event_news_table_id,
  title,
  imageUrl,
}) {
  console.log('NewsCard ID:', event_news_table_id);
  return (
    <Card className="overflow-hidden max-w-sm group">
      <div className="relative flex flex-col h-full">
        {/* Header Banner */}
        <div className="bg-primary-500 dark:bg-gray-800 p-6 text-white">
          <h2 className="text-lg font-semibold leading-tight text-primary-100 dark:text-primary-100">
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
            className="p-0 h-auto font-semibold text-primary-500 dark:text-primary-100 hover:text-primary-600 dark:hover:text-primary-200"
            asChild
          >
            <Link to={`/news/${event_news_table_id}`} className="flex items-center gap-1">
              Continue reading
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}