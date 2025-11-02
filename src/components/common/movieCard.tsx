"use client";
import { getPosterUrl } from "@/utils/getImageUrl ";
import { Image } from "@heroui/react";
import Link from "next/link";

interface IProps {
  title: string;
  imgUrl: string;
  id: number;
}

const MovieCard = ({ title, imgUrl, id }: IProps) => {
  return (
    <Link href={`/movie/${id}`}>
      <div className="group flex flex-col gap-2 ">
        <div className="aspect-[2/3] w-full rounded-lg ">
          <Image
            alt={title}
            className="h-full w-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
            radius="lg"
            shadow="sm"
            src={imgUrl ? getPosterUrl(imgUrl, "w500") : "/gray-bg.jpg"}
          />
        </div>
        <p className="truncate md:text-sm font-medium text-white">{title}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
