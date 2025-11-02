import { Divider } from "@heroui/react";

const Footer = () => {
  return (
    <div className="container">
      <Divider className="mb-2 bg-gray-700" />
      <div className="flex justify-between  text-gray-600 ">
        <p className="text-[15px]">© 2024 CineView. All Rights Reserved.</p>

        <div className="flex justify-center items-center">
          <button className="text-[15px] mr-2 cursor-pointer">
            Terms of Service
          </button>
          <button className="text-[15px] cursor-pointer">Privacy Policy</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
