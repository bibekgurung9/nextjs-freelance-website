import Link from "next/link";
import { formatPrice } from '@/lib/format-price'

interface JobCardProps {
  id: string;
  title: string;
  chaptersLength: number;
  price: number;
  progress: number | null;
  category: string;
};

export const JobCard = ({
  id,
  title,
  chaptersLength,
  price,
  progress,
  category,
} : JobCardProps) => {
  return(
    <Link href={`/jobs/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-l p-3 h-full">
        <div className="flex flex-col pt-2">
          {progress !== null ? (
            <div>
              TODO: 
            </div>
          ) : (
            <p className="text-cl md:text-l fonr-medium text-salte-700">
              {formatPrice(price)}
            </p>  
          )}
          <div className="text-lg md:text-base font-medium group-hover:text-sky-7-- transi line-clamp-2">
            {title}
          </div>
          <p className="text-xs">
            {category}
          </p>
        </div>
      </div>

    </Link>
  )
}