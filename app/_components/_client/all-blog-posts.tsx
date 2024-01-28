"use client";

import React, { useState, useEffect } from "react";
import { Button, Typography, Card, CardBody } from "@material-tailwind/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import AllBlogPostCard from "./all-blog-post-card";
import useBlogPostsData from "@/hooks/use-blogposts-data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function AllBlogPosts() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scroll(0, 0);

    // Cleanup the effect to ensure it runs only once
  }, []);
  const { blogPostsData } = useBlogPostsData();

  // Assuming you have these values from your API
  const totalPosts = blogPostsData?.length || 0;
  const postsPerPage = 3; // Adjust this value as needed
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the current page
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts =
    blogPostsData?.slice(firstPostIndex, lastPostIndex) || [];

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-40 px-8">
      <div className="container mx-auto mb-12">
        <Typography placeholder="" variant="h3" color="blue-gray">
          Check my latest blog posts
        </Typography>
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        {currentPosts.map((item: any) => (
          <AllBlogPostCard
            key={item.id}
            img={item.imageUrl}
            title={item.title}
            desc={item.content}
            blogpostId={item.id}
          />
        ))}
      </div>
      {totalPosts > postsPerPage && (
        <PaginationSection
          totalPosts={totalPosts}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
      )}
    </section>
  );
}

function PaginationSection({
  totalPosts,
  postsPerPage,
  currentPage,
  setCurrentPage,
}: {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const maxPageNum = 5; // Maximum page numbers to display at once
  const pageNumLimit = Math.floor(maxPageNum / 2); // Current page should be in the middle if possible

  let activePages = pageNumbers.slice(
    Math.max(0, currentPage - 1 - pageNumLimit),
    Math.min(currentPage - 1 + pageNumLimit + 1, pageNumbers.length)
  );

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to render page numbers with ellipsis
  const renderPages = () => {
    const renderedPages = activePages.map((page, idx) => (
      <PaginationItem
        key={idx}
        className={
          currentPage === page ? "bg-neutral-100 rounded-md cursor-pointer" : ""
        }
      >
        <PaginationLink
          className="cursor-pointer"
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));

    // Add ellipsis at the start if necessary
    if (activePages[0] > 1) {
      renderedPages.unshift(
        <PaginationEllipsis
          key="ellipsis-start"
          onClick={() => setCurrentPage(activePages[0] - 1)}
        />
      );
    }

    // Add ellipsis at the end if necessary
    if (activePages[activePages.length - 1] < pageNumbers.length) {
      renderedPages.push(
        <PaginationEllipsis
          key="ellipsis-end"
          onClick={() =>
            setCurrentPage(activePages[activePages.length - 1] + 1)
          }
        />
      );
    }

    return renderedPages;
  };

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={handlePrevPage}
            />
          </PaginationItem>

          {renderPages()}

          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={handleNextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
