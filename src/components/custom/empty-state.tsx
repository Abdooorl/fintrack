import Image from "next/image";
import Empty from "../../../public/Empty.png";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="empty w-full h-[50vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Image src={Empty} alt="No Data Found" className="w-[150px] " />
          <div className="flex flex-col items-center gap-[2px] text-center">
            <p className="text-gray-700 font-semibold text-[16px]">
              Nothing to see here
            </p>
            <p className="text-gray-500 text-[14px]">
              You have not updates  
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
