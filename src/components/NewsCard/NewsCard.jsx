import { Card, CardContent } from "@/components/ui/card"
import { Link } from 'react-router-dom'

export default function NewsCard({
  event_news_table_id,
  title,
  imageUrl,
}) {
  const handleImageError = (e) => {
    e.target.src = '/images/fallback-news.jpg'
    e.target.onerror = null
  }

  return (
    <Card className="overflow-hidden max-w-sm group hover:scale-105 transition-transform duration-300">
      <div className="relative flex flex-col h-full bg-black text-white">
        <div className="relative h-64">
          <img
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full opacity-80"
            onError={handleImageError}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>

        <CardContent className="absolute bottom-0 p-6 w-full">
          <Link 
            to={`/news/${event_news_table_id}`}
            className="block hover:text-primary-100 transition-colors"
          >
            <h2 className="text-2xl text-white font-bold leading-tight tracking-tight">
              {title}
            </h2>
          </Link>
        </CardContent>
      </div>
    </Card>
  )
}