import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchSkeleton() {
  return (
    <form className="relative flex items-center">
      <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-lg flex items-center justify-center">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
      </div>
    </form>
  );
}
