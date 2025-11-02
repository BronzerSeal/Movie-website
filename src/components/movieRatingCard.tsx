import { getRatingDistribution } from "@/utils/getRatingDistribution";
import { Progress } from "@heroui/react";
import { Star } from "lucide-react";

interface RatingProps {
  voteAverage: number;
  voteCount: number;
}

const MovieRatingCard = ({ voteAverage, voteCount }: RatingProps) => {
  const stars = Math.round(voteAverage / 2);
  const avg = (voteAverage / 2).toFixed(1);

  // примерное распределение
  const distribution = getRatingDistribution(voteAverage);

  return (
    <div className="bg-[#1c0f0f] text-white rounded-xl p-4 w-72 mt-3 ">
      <h3 className="text-3xl font-semibold mb-3">Ratings</h3>

      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold">{avg}</span>
        <span className="text-gray-400">/ 5</span>
      </div>

      <div className="flex gap-1 my-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < stars ? "text-red-400 fill-red-400" : "text-gray-600"
            }`}
          />
        ))}
      </div>

      <p className="text-sm text-gray-400 mb-3">{voteCount} reviews</p>

      {distribution.map((value, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <span className="w-2 text-right">{5 - index}</span>
          <Progress
            aria-label={`Rating ${5 - index}`}
            value={value}
            className="flex-1"
            color="danger"
          />
          <span className="text-gray-400 w-8 text-right">{value}%</span>
        </div>
      ))}
    </div>
  );
};

export default MovieRatingCard;
