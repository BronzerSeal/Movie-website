"use client";

import { Button } from "@heroui/react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-8xl font-bold text-[#d13a3a]">404</div>

      <h1 className="text-3xl font-bold tracking-tight">Страница не найдена</h1>

      <div className="pt-6">
        <Button as={Link} color="danger" variant="shadow" href="/">
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
}
