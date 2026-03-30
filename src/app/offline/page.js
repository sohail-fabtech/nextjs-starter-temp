import { WifiOff } from "lucide-react";

export const metadata = {
  title: "Offline",
  description: "You are currently offline",
};

export default function OfflinePage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-6 px-8 text-center">
        <WifiOff className="h-16 w-16 text-zinc-400 dark:text-zinc-600" />
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          You're offline
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          It looks like you've lost your internet connection. Please check your
          network and try again.
        </p>
        <a
          href="/"
          className="flex h-12 items-center justify-center rounded-full bg-foreground px-8 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Go Home
        </a>
      </main>
    </div>
  );
}
