'use client';

import { ArrowLeft, ArrowRight } from "@deemlol/next-icons";
import clsx from "clsx";
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

interface PaginationProps {
  totalPages: number
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  }

  return (

    <div className="flex items-center justify-between mt-2">
      <PaginationArrow
        href={createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
        direction="left"
      />
      {/* <Link */}
      {/*   className="px-3 py-1 rounded bg-zinc-200 text-zinc-700 disabled:opacity-50" */}
      {/*   onClick={handlePrev} */}
      {/*   disabled={currentPage <= 1} */}
      {/* > */}
      {/*   Prev */}
      {/* </Link> */}
      <span className="text-sm">
        Page {currentPage} of {totalPages || 1}
      </span>
      <PaginationArrow
        href={createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        direction="right"
      />
      {/* <Link */}
      {/*   className="px-3 py-1 rounded bg-zinc-200 text-zinc-700 disabled:opacity-50" */}
      {/*   onClick={handleNext} */}
      {/*   disabled={page === totalPages || totalPages === 0} */}
      {/* > */}
      {/*   Next */}
      {/* </Link> */}
    </div>
  )
}

function PaginationArrow({ href, direction, disabled }: { href: string, direction: 'left' | 'right', disabled: boolean }) {
  const className = clsx(
    'flex h-10 w-10 items-center justify-center rounded-md border',
    {
      'pointer-events-none text-gray-300': disabled,
      'hover:bg-gray-100': !disabled,
      'mr-2 md:mr-4': direction === 'left',
      'ml-2 md:ml-4': direction === 'right',
    },
  );

  const icon =
    direction === 'left' ? (
      <ArrowLeft />
    ) : (
      <ArrowRight />
    )
  return disabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href} className={className}>
      {icon}
    </Link>
  )
}