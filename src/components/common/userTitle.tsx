import { Avatar } from "@heroui/react";

interface IProps {
  userName: string | null | undefined;
  userEmail: string;
  avatar: string | null | undefined;
}

const UserTitle = ({ userName, userEmail, avatar }: IProps) => {
  return (
    <div className="flex gap-2">
      <Avatar src={avatar as string | undefined} size="md" />
      <div>
        <h1 className="font-bold">{userName || userEmail}</h1>
        <p className="text-gray-400 text-[14px]">{userEmail}</p>
      </div>
    </div>
  );
};

export default UserTitle;
