import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ArticlePreview({ article, user, handleDel }) {
  const navigate = useNavigate();

  return (
    <div className="mx-auto mb-8 max-w-xl bg-white border border-gray-200 rounded-lg shadow">
      {/* Article Image */}
      <Link to={`article/${article.id}`}>
        <img className="rounded-t-lg" src={article.image} />
      </Link>

      {/* Article Title */}
      <div className="p-5">
        <Link to={`article/${article.id}`}>
          <h5 className="hover:text-blue-800 mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {article.title}
          </h5>
        </Link>

        {/* Article Description */}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {article.description}
        </p>

        {/* Article Actions (Edit + Delete) */}
        {user?.uid == article.authorId ? (
          <>
            {/* Edit Article */}
            <button
              className="inline-flex items-center mr-2 px-5 py-2 text-xs font-light text-center text-white bg-blue-700 rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={() => {
                navigate(`/article-update/${article.id}`);
              }}
            >
              Edit
            </button>

            {/* Delete Article */}
            <button
              className="inline-flex items-center px-5 py-2 text-xs font-light text-center text-white bg-red-700 rounded-full focus:ring-4 focus:outline-none focus:ring-blue-300"
              onClick={() => {
                handleDel(article.id, user);
              }}
            >
              Delete
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
