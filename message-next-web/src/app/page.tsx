import Image from "next/image";
import { SiderBar } from "@/components/shared/SiderBar/SiderBar";
export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex overflow-hidden bg-background">
        <div className="hidden lg:flex w-16 flex-shrink-0 z-30">
          <SiderBar />
        </div>
      </div>
    </>
  );
}