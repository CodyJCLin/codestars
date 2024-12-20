import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t-2 border-slate-200 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/c++.svg"
            alt="C++"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          C ++
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/java.svg"
            alt="Java"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Java
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/python.svg"
            alt="Python"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          Python
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/js.svg"
            alt="JavaScript"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          JavaScript
        </Button>

        <Button size="lg" variant="ghost" className="w-full cursor-default">
          <Image
            src="/sql.svg"
            alt="SQL"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          SQL
        </Button>
      </div>
    </div>
  );
};
