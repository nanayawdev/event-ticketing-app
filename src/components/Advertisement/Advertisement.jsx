import { ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"

const Advertisement = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl">Advertisement</CardTitle>
        <CardDescription>Special offers and promotions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <img 
            src="your-ad-image-url.jpg" 
            alt="Advertisement"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Special Promotion Title</h3>
          <p className="text-sm text-muted-foreground">
            Brief description of the promotion or advertisement goes here.
          </p>
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={() => window.open('your-ad-link', '_blank')}
          >
            Learn More
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default Advertisement 