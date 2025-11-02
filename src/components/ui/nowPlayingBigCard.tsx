"use client";
import { getBackdropUrl } from "@/utils/getImageUrl ";
import { Card, CardFooter, Image, Button, Chip } from "@heroui/react";
import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MovieInfoModal from "./modals/movieInfo.modal";

interface IProps {
  bgPath: string;
  title: string;
  id: number;
  showButtons?: boolean;
  movieDopInfo: {
    adult: boolean;
    budget: number;
    genres: { id: number; name: string }[];
    original_language: string;
    release_date: string;
  };
}

const NowPlayingBigCard = ({
  bgPath,
  title,
  id,
  showButtons = true,
  movieDopInfo,
}: IProps) => {
  const [isMovieInfoOpen, setIsMovieInfoOpen] = useState(false);

  return (
    <Card isFooterBlurred className="mt-3 text-white">
      <Image
        alt="Now playing"
        src={getBackdropUrl(bgPath, "original")}
        isBlurred
      />
      <CardFooter
        className={`before:bg-white/10 border-white/20 border-1  py-1 absolute  rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 
        ${!showButtons && "justify-between"}`}
      >
        <div>
          <h1
            className={`font-bold ${
              showButtons ? "text-4xl" : "md:text-3xl"
            }  mb-0.5`}
          >
            {title}
          </h1>

          {showButtons && (
            <div className="flex items-center gap-2 py-1">
              <Link href={`movie/${id}`}>
                <Button color="danger">
                  <Image
                    src={"/play.png"}
                    alt={"play"}
                    width={24}
                    height={24}
                  />
                  Play
                </Button>
              </Link>

              <Button color="primary" onPress={() => setIsMovieInfoOpen(true)}>
                <Image src={"/info.png"} alt={"info"} width={24} height={24} />
                More info
              </Button>
            </div>
          )}
        </div>
        {!showButtons && (
          <Chip
            onClick={() => setIsMovieInfoOpen(true)}
            className="cursor-pointer"
            startContent={<Info />}
            color="danger"
          >
            Info
          </Chip>
        )}

        <MovieInfoModal
          dopInfo={movieDopInfo}
          isOpen={isMovieInfoOpen}
          onClose={() => setIsMovieInfoOpen(false)}
        />
      </CardFooter>
    </Card>
  );
};

export default NowPlayingBigCard;
