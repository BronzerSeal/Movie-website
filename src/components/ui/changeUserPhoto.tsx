"use client";
import { useAuthStore } from "@/store/auth.store";
import { handleUpload } from "@/actions/handleUpload";
import { Avatar, Button, Card } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useRef } from "react";

interface IProps {
  userId: string;
  userImg: string | null | undefined;
  previewUrl: string | null;
  setPreviewUrl: (arg0: string) => void;
}

const ChangeUserPhoto = ({
  userId,
  userImg,
  previewUrl,
  setPreviewUrl,
}: IProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { session, setAuthState } = useAuthStore();
  const { update } = useSession();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      const url = await handleUpload(file, userId);

      await update({
        user: { ...session!.user, image: url },
      });

      setAuthState("authenticated", {
        ...session!,
        user: {
          ...session!.user,
          image: url,
        },
      });
    } catch (error) {
      console.error("Ошибка при загрузке аватара:", error);
    }
  };
  return (
    <Card className="bg-[#1b0f0f] rounded-xl p-6 mt-4 w-full">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <Avatar
            className="w-24 h-24 ring-4 ring-white/10  shrink-0"
            size="lg"
            isBordered
            src={previewUrl || userImg || undefined}
          />
          <div className="flex flex-col justify-center">
            <p className="text-white text-xl font-bold leading-tight tracking-[-0.015em]">
              Profile photo
            </p>
            <p className="text-slate-400 text-sm font-normal leading-normal mt-1">
              Upload a new photo. Recommended size: 300x300.
            </p>
          </div>
        </div>

        <Button
          onPress={handleButtonClick}
          size="lg"
          radius="sm"
          variant="shadow"
        >
          Upload Image
        </Button>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
    </Card>
  );
};

export default ChangeUserPhoto;
