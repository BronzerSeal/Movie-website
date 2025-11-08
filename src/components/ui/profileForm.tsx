"use client";
import { updateUser } from "@/actions/update-user";
import { Button, Card, CardBody, Input, Textarea } from "@heroui/react";

interface IProps {
  userEmail: string;
  userName: string;
  aboutUser: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export default function ProfileForm({
  userEmail,
  userName,
  aboutUser,
  onChange,
}: IProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updateUser({
      email: userEmail,
      name: userName,
      about: aboutUser,
    });

    window.location.reload();
  };
  return (
    <Card className="bg-[#1b0f0f] rounded-xl p-6 w-full text-white">
      <CardBody>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col w-full">
              <p className="text-[15px] font-bold leading-normal pb-2 text-slate-200">
                Email
              </p>
              <Input
                placeholder="Enter your username"
                name="email"
                disabled
                defaultValue={userEmail}
                classNames={{
                  inputWrapper:
                    "bg-gray-500 border border-white/20 rounded-lg h-12 px-4 text-base text-white focus-within:ring-2 focus-within:ring-red-500/40",
                  input:
                    "text-white text-[19px] font-bold placeholder:text-slate-500 focus:outline-none",
                }}
              />
            </div>
            <div className="flex flex-col w-full">
              <p className="text-[15px] font-bold leading-normal pb-2 text-slate-200">
                Display name
              </p>
              <Input
                placeholder="Enter your display name"
                name="displayName"
                onChange={onChange}
                defaultValue={userName}
                classNames={{
                  inputWrapper:
                    "bg-gray-300 border border-white/20 rounded-lg h-12 px-4 text-base text-white focus-within:ring-2 focus-within:ring-red-500/40",
                  input:
                    "text-white text-[19px] font-bold placeholder:text-slate-500 focus:outline-none",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <p className="text-[15px] font-bold leading-normal pb-2 text-slate-200">
              About me
            </p>
            <Textarea
              placeholder="Tell us a little about yourself..."
              name="about"
              onChange={onChange}
              defaultValue={aboutUser}
              minRows={5}
              classNames={{
                inputWrapper:
                  "bg-gray-300 border border-white/20 rounded-lg p-4 min-h-28 text-base text-white focus-within:ring-2 focus-within:ring-red-500/40",
                input:
                  "text-white text-[19px] font-bold placeholder:text-slate-500 resize-y",
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-white/10">
            <p className="text-slate-400 text-sm">
              Your profile is visible to other users.{" "}
              <a
                href="#"
                className="text-red-500 hover:underline font-medium transition-colors"
              >
                View public profile
              </a>
            </p>

            <div className="flex gap-3 justify-end">
              <Button
                variant="flat"
                className="bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                Cancel
              </Button>
              <Button color="danger" className="font-bold" type="submit">
                Save changes
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
