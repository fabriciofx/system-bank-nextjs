'use client';

export default function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white/60 flex justify-center items-center z-[9999]">
      <div className="w-20 h-20 border-4 border-solid border-[#ddd] border-t-[#007bff] rounded-full animate-spin" />
    </div>
  );
}
