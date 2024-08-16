import Link from "next/link";
import React from "react";

function Card({
  href,
  icon,
  title,
  card1,
  card2,
  count1,
  count2,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  card1: string;
  card2: string;
  count1: number;
  count2: number;
}) {
  return (
    <article className="bg-white px-5 py-8 min-w-[13rem] hover:bg-primary transition-all duration-200 group">
      <Link href={href} className="flex flex-col gap-3">
        {/* icon */}
        <div className="icon bg-green-50 p-2 w-fit rounded-full text-primary">{icon}</div>

        {/* title */}
        <h4 className="text-primary mb-5 group-hover:text-white">{title}</h4>

        {/* status card */}
        <div className="cards flex gap-5 justify-center items-center ">
          <article className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-3xl font-semibold text-primary group-hover:text-white">{count1}</h4>
            <p className="text-gray-400 text-[12px]">{card1}</p>
          </article>

          <div className="bg-gray-400 h-[2.5rem] w-[1px]"></div>

          <article className="flex flex-col gap-1 justify-center items-center">
            <h4 className="text-3xl font-semibold text-primary group-hover:text-white">{count2}</h4>
            <p className="text-gray-400 text-[12px]">{card2}</p>
          </article>
        </div>
      </Link>
    </article>
  );
}

export default Card;
