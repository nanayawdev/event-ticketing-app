import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { Link } from 'react-router-dom'

export default function NewsCard({
  event_news_table_id,
  title,
  imageUrl,
}) {
  return (
    <Card className="overflow-hidden max-w-sm group hover:scale-105 transition-transform duration-300">
      <div className="relative flex flex-col h-full bg-black text-white">
        {/* Main Image with Overlay */}
        <div className="relative h-64">
          <img
            src={imageUrl}
            alt=""
            className="object-cover w-full h-full opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        {/* Typography-focused Content */}
        <CardContent className="absolute bottom-0 p-6 w-full">
          <h2 className="text-2xl font-bold leading-tight mb-4 tracking-tight">
            {title}
          </h2>
          
          <Button 
            variant="link" 
            className="p-0 h-auto font-mono text-sm text-white/90 hover:text-white"
            asChild
          >
            <Link to={`/news/${event_news_table_id}`} className="flex items-center gap-2">
              READ MORE
              <ArrowRight className="w-3 h-3" />
            </Link>
          </Button>
        </CardContent>
      </div>
    </Card>
  )
}