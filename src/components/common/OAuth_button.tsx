import Image from "next/image";

interface IProps {
  company: "Google";
  imageUrl: string;
}

const OAuthButton = ({ company, imageUrl }: IProps) => {
  const Logo = () => {
    return (
      <Image
        src={imageUrl}
        alt={"CompanyLogo"}
        width={24}
        height={24}
        priority
      />
    );
  };

  return (
    <button
      className={`border border-gray-400 cursor-pointer flex items-center gap-2
                  h-10 p-1 rounded-medium w-full text-gray-500`}
    >
      <Logo />
      Enter with {company}
    </button>
  );
};

export default OAuthButton;
