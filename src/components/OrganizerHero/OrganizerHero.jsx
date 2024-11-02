import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TfiYoutube } from "react-icons/tfi"
import { FaSpotify } from "react-icons/fa"
import thumbnailimg from "../../assets/images/amakyedede.jpeg"
export default function Component() {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <img
              src={thumbnailimg}
              alt="Podcast recording session"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 bg-gray-100">
              <div className="text-sm text-gray-600">Listeners</div>
              <div className="text-3xl font-bold">340k+</div>
            </Card>
            <Card className="p-6 bg-green-50">
              <div className="text-sm text-gray-600">Streams</div>
              <div className="text-3xl font-bold">500k+</div>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Unlock Your Potential
            </h1>
            <p className="text-xl text-gray-600">
              With Our Self-Improvement Podcast
            </p>
          </div>

          {/* Episode Card */}
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={thumbnailimg}
                  alt="Episode thumbnail"
                  className="w-20 h-20 rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500">Eps. 205 - Mastering Mindfulness:</p>
                <h3 className="text-lg font-semibold">
                  Finding Peace in the Present with Jason Rivers
                </h3>
                <Button variant="secondary" size="sm" className="mt-2">
                  Play this episode
                </Button>
              </div>
            </div>
          </Card>

          {/* Listen On Section */}
          <div className="space-y-4">
            <p className="text-sm font-medium">Listen On</p>
            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <TfiYoutube className="h-5 w-5" />
                <span>YouTube</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <FaSpotify className="h-5 w-5" />
                <span>Spotify</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}