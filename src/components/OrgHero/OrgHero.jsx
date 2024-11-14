import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PlayCircle, Check } from 'lucide-react';
import orghero from '../../assets/images/photoshoot2.jpeg'
import orgherovideo from '../../assets/images/photoshoot3.jpeg'
import ProfileCardGrid from '../ProfileCardGrid/ProfileCardGrid';

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 max-w-[1400px]">
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[1fr_1fr] items-center">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={orghero}
                  alt="Conference hall with blue lighting"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="relative overflow-hidden rounded-xl bg-muted">
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  onClick={() => setVideoOpen(true)}
                >
                  <img
                    src={orgherovideo}
                    alt="Video thumbnail"
                    className="object-cover w-full h-full transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <PlayCircle className="w-16 h-16 text-white absolute" />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-8 lg:pl-8">
              <div className="space-y-6">
                <div className="space-y-4">

                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                   Discover Your Next Adventure.
                  </h1>
                  <p className="text-muted-foreground md:text-sm">
                  Explore a variety of events—from live music and sports to cultural festivals and conferences—all in one place, for memories that last a lifetime.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Lorem ipsum dolor sit amet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Adipiscing elit tempor</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    <span>Ut enim ad minim</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button className="w-fit" size="lg">
                  About Us
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-fit border-primary-500 text-primary-400 hover:bg-primary-50"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="max-w-4xl p-0">
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </DialogContent>
        </Dialog>
      </section>
      
      <ProfileCardGrid />
    </>
  );
}