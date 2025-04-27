import { HomeMapCard } from "@/components/home-map-card";
import { Button } from '@/components/ui/button';
import { maps } from "@/lib/map-examples";
import { FilePlus2Icon, JoystickIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Hero />
      <Examples />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-center py-32 container mx-auto">
      <div className="text-center flex flex-col items-center">
        <Button asChild variant="ghost">
          <a href="https://github.com/carmack-inc" target="_blank">
            <span className="inline-flex items-center justify-center size-6 bg-foreground rounded-md">
              <JoystickIcon className="size-4 text-background" />
            </span>
            <span className="font-medium text-base">Carmack Inc.</span>
          </a>
        </Button>

        <h1 className="text-5xl font-semibold tracking-tight">
          Raycasting engine
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          Simple engine based on the raycasting rendering technique.
        </p>
      </div>

      <div className="flex items-center gap-x-2 mt-6">
        <Button asChild>
          <Link href="/engine">
            <FilePlus2Icon />
            New project
          </Link>
        </Button>

        <Button asChild variant="secondary">
          <a href="https://github.com/carmack-inc/raycasting-engine" target="_blank">
            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="currentColor" />
            </svg>
            GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}

function Examples() {
  return (
    <section className="container mx-auto pb-20">
      <h2 className="font-semibold text-lg tracking-tight">
        Get started with some examples
      </h2>
      <p className="text-muted-foreground text-sm">
        Pick one of the maps handcrafted by our team to start prototyping faster.
      </p>

      <div className="grid grid-cols-3 gap-6 mt-8">
        {maps.map(({ name, description, creator }, idx) => (
          <HomeMapCard
            key={idx}
            id={idx + 1}
            name={name}
            description={description}
            creator={creator}
          />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-center text-sm text-muted-foreground py-8 border-t">
      <p>
        Project developed during the Software Engineering Lab. class at <a href="https://ufabc.edu.br/" target="_blank" className="hover:text-foreground hover:underline hover:underline-offset-4">UFABC</a>.
      </p>
      <p>Copyright &copy; 2025 Carmack Inc.</p>
    </footer>
  );
}
