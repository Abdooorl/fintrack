"use client";

interface MainContainerProps {
  children: React.ReactNode;
}

export default function MainContainter({ children }: MainContainerProps) {
  return (
    <div className="flex-1 flex flex-col">
      <main
        className="h-full flex-1 px-[20px] sm:px-[48px] pt-[28px] overflow-y-auto scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {children}
      </main>
    </div>
  );
}
