import { Button } from '@/components/ui/button'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
      This is the beginning

      <Button asChild size="sm">
        <Link href="/engine">
          Go to the engine
          <ArrowRightIcon />
        </Link>
      </Button>
    </div>
  );
}
