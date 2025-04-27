import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRightIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface HomeMapCardProps {
  id: number
  name: string
  description: string
  creator: string
}

export function HomeMapCard({ id, name, description, creator }: HomeMapCardProps) {
  return (
    <Link
      className="group relative rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background" 
      href={{
        pathname: "/engine",
        query: { example: id },
      }}
      aria-labelledby={`card-${id}-name`}
    >
      <span aria-hidden="true" className="absolute -inset-2 bg-muted rounded-lg opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-[opacity,transform]" />

      <div className="aspect-video bg-muted rounded-md overflow-hidden shadow-sm relative border">
        <Image
          src={`/maps/map-${id}.jpg`}
          width={840}
          height={480}
          alt={`${name} screenshot`}
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between gap-x-2 text-sm font-medium bg-white text-black py-1 w-fit px-3 rounded-full shadow">
            Open in the engine
            <ArrowRightIcon className="size-4" />
          </div>
        </div>
      </div>

      <div className="mt-2 relative flex items-center gap-x-3 w-full">
        <Avatar className="size-9 shrink-0 ring-1 ring-border">
          <AvatarImage src={`https://github.com/${creator}.png`} alt={`${creator}'s avatar`} />
          <AvatarFallback>
            <UserIcon />
          </AvatarFallback>
        </Avatar>

        <div className="-space-y-0.5 flex-1">
          <span id={`card-${id}-name`} className="block font-medium text-sm line-clamp-1">{name}</span>
          <span className="block text-sm text-muted-foreground line-clamp-1">{description}</span>
        </div>
      </div>
    </Link>
  );
}
