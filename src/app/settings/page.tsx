"use client";
import { getUserByEmail } from "@/actions/getUserByEmail";
import { signOutFunc } from "@/actions/sign-out";
import MovieCard from "@/components/common/movieCard";
import UserTitle from "@/components/common/userTitle";
import ChangeUserPhoto from "@/components/ui/changeUserPhoto";
import ProfileForm from "@/components/ui/profileForm";
import { userSettingsConfig } from "@/config/userSettingsConfig";
import { movieService } from "@/services/movieService";
import { useAuthStore } from "@/store/auth.store";
import { DetailMovie } from "@/types/movie.types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@heroui/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FormData {
  email: string | null;
  displayName: string | null;
  about: string | null;
}

const SettinsPage = () => {
  const { session, status, setAuthState } = useAuthStore();
  const [selectedButton, setSelectedButton] = useState("Home");
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [favouriteMovies, setFavouriteMovies] = useState<DetailMovie[] | null>(
    null
  );

  const [formData, setFormData] = useState<FormData>({
    email: null,
    displayName: "",
    about: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function fetchUser() {
      if (!session?.user?.email) return;
      const data = await getUserByEmail(session.user.email);

      if (!data) return;
      setFormData({
        email: data.email,
        displayName: data.name,
        about: data.about,
      });
    }

    if (session?.user?.email) fetchUser();
  }, [session]);

  useEffect(() => {
    async function getFavouriteMovies() {
      if (!session?.user?.favouriteMovies) return;
      const data = await movieService.getFavouriteMovies(
        session?.user?.favouriteMovies
      );

      if (!data) return;
      setFavouriteMovies(data);
    }

    if (session?.user?.favouriteMovies) getFavouriteMovies();
  }, [session]);

  const handleSignOut = async () => {
    try {
      await signOutFunc();
    } catch (error) {
      console.log("Error", error);
      toast.error("Something was wrong. Try again later");
    }

    setAuthState("unauthenticated", null);
    router.push("/");
  };

  if (status !== "authenticated")
    return <p className="text-white text-2xl font-bold">unauthorize</p>;
  if (!session || !session.user?.id || formData.email === null)
    return <p className="text-white ">Loading...</p>;

  return (
    <div className="container text-white grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6 mt-6">
      <Card className="bg-[#1b0f0f] text-white">
        <CardHeader className="flex flex-col">
          <UserTitle
            userName={formData.displayName}
            userEmail={formData.email!}
            avatar={previewUrl || session.user?.image}
          />
          <Divider className="bg-gray-600 mt-2" />
        </CardHeader>
        <CardBody>
          <div className="flex flex-col gap-2">
            {userSettingsConfig.cardItems.map((item) => {
              const Icon = item.img;
              return (
                <Button
                  key={item.label}
                  color="danger"
                  startContent={<Icon size={20} />}
                  onPress={() => setSelectedButton(item.label)}
                  variant={selectedButton === item.label ? "flat" : "light"}
                >
                  {item.label}
                </Button>
              );
            })}
          </div>
        </CardBody>
        <CardFooter className="flex flex-col justify-start items-start gap-3 w-full">
          <Divider className="bg-gray-600 mt-2" />
          <Button
            color="default"
            className="text-gray-400 w-full text-left"
            startContent={<LogOut />}
            variant={"light"}
            onPress={handleSignOut}
          >
            Log out
          </Button>
        </CardFooter>
      </Card>

      <div>
        {selectedButton === "Home" ? (
          <>
            <h1 className="font-bold text-4xl">Profile Settings</h1>
            <h2 className="text-gray-500 text-[18px]">
              Manage your public profile information.
            </h2>
            <ChangeUserPhoto
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              userImg={session.user?.image}
              userId={session.user?.id}
            />

            <div className="mt-6">
              <ProfileForm
                userName={formData.displayName || ""}
                userEmail={formData.email}
                aboutUser={formData.about || ""}
                onChange={handleChange}
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="font-bold text-4xl">Favourite movies</h1>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {favouriteMovies?.length === 0 || favouriteMovies === null ? (
                <p>No movies</p>
              ) : (
                favouriteMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    imgUrl={movie.poster_path!}
                    title={movie.title!}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SettinsPage;
