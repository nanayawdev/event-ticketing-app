import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Twitter, Facebook, Linkedin } from 'lucide-react';

export default function NewsRead() {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching news with ID:', id);
    fetch(`https://api-server.krontiva.africa/api:BnSaGAXN/event_news_table/{event_news_table_id}`)
      .then(response => response.json())
      .then(data => {
        console.log('News item data:', data);
        setNewsItem(data);
      })
      .catch(error => {
        console.error('Error fetching news item:', error);
        setError(error.message);
      });
  }, [id]);

  if (error) return <div>Error loading news: {error}</div>;
  if (!newsItem) return <div>Loading...</div>;

  const shareUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent(newsItem.newsTitle);
  const publishDate = newsItem.publishedDate ? parseISO(newsItem.publishedDate) : new Date();

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 mt-20">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{newsItem.newsTitle}</h1>
        <div className="flex items-center justify-between flex-wrap gap-4 text-muted-foreground mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              <time dateTime={newsItem.publishedDate}>
                {format(publishDate, 'MMMM d, yyyy')}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Author" />
                <AvatarFallback>AU</AvatarFallback>
              </Avatar>
              <span>Author</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" asChild>
              <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
                <Facebook className="w-4 h-4" />
              </a>
            </Button>
            <Button variant="outline" size="icon" asChild>
              <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
        <img
          src={newsItem.newsImage}
          alt=""
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      </header>
      <div className="prose prose-lg max-w-none">
        {newsItem.newsBody?.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </article>
  );
} 