import Image from "next/image";

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Message App</h1>
        <p className="text-lg text-muted-foreground">
          Start chatting with your friends!
        </p>
      </div>
    </div>
  );
}