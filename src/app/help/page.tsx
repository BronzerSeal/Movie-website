"use client";
import helpPageConfig from "@/config/helpPage.config";
import { Input } from "@heroui/input";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { Album, HeartHandshake, Search } from "lucide-react";

const HelpPage = () => {
  const iconsMap: any = {
    HeartHandshake: HeartHandshake,
    Album: Album,
  };

  return (
    <div className="container  text-white flex flex-col ">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-extrabold text-6xl mt-4">How can we help?</h1>
        <h2 className="text-gray-400 text-[19px] mt-1 mb-3">
          Find answers, contact us, or check out our guides.
        </h2>
      </div>

      <Input
        size="lg"
        radius="lg"
        variant="flat"
        placeholder="Поиск по вопросам..."
        startContent={
          <div className="flex items-center justify-center pl-2">
            <Search className="text-gray-500 dark:text-gray-400" size={22} />
          </div>
        }
        className="bg-gray-300"
        classNames={{
          base: "shadow-sm rounded-xl h-full w-full bg-gray-300",
          inputWrapper:
            "bg-gray-200 dark:bg-gray-800 border-none h-full rounded-xl focus:ring-2 focus:ring-primary focus:ring-inset",
          input:
            "text-base text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
        }}
      />
      <section className="mt-4">
        <div className="w-[520px] md:w-[700px]">
          <h1 className="font-bold text-2xl">Often Ask questions</h1>
          <Accordion variant="splitted" className="mt-2 w-full">
            {helpPageConfig.oftenQuestions.map((q, index) => (
              <AccordionItem
                key={index}
                aria-label={`Accordion ${index + 1}`}
                title={q.title}
                className="text-black bg-gray-300"
              >
                {q.text}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="mt-3 flex flex-col justify-center items-center">
        <h1 className="font-bold text-2xl">Didn't find answer?</h1>
        <h2 className="text-gray-500">chat with us</h2>

        <div className="flex flex-col md:flex-row gap-4">
          {helpPageConfig.chatWithUs.map((chat, index) => {
            const Icon = iconsMap[chat.icon];
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-xl bg-gray-300 dark:bg-gray-800/50 w-[300px]"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-danger/20 text-danger">
                  <Icon className="text-3xl" />
                </div>

                <h3 className="text-lg font-bold text-black dark:text-white">
                  {chat.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {chat.subtitle}
                </p>

                <Button
                  color="danger"
                  className="mt-6 flex items-center justify-center rounded-lg h-11 "
                >
                  {chat.buttonText}
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
