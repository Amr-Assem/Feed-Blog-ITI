/* -------------------------------------------------------------------------- */
/*                         Article[id] --> ArticleFull                        */
/* -------------------------------------------------------------------------- */
// TODO: Turn this into a bigger article (--> RSS Feed Style!)
// AAAAAAA3333 xD

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../helpers/ArticlesCRUD";

export default function Article() {
  const [article, setArticle] = useState([]);
  const { id } = useParams();

  // Fetch Article Details
  useEffect(() => {
    async function fetchArticle() {
      console.log(id);
      const data = await getArticleById(id);
      console.log(data);
      setArticle(data);
    }

    fetchArticle();
  }, []);
  /* -------------------------------------------------------------------------- */

  console.log(id);
  return (
    <div className="flex flex-col gap-2 mx-auto w-4/5 p-4 bg-white border border-gray-200 rounded-lg shadow">
      <div className="flex flex-row items-center rounded-lg">
        {/* Article Image */}
        <img
          className="object-fill rounded-lg h-40 mr-16 w-auto"
          src={article.image}
        />

        {/* Article Title */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {article.title}
        </h5>
      </div>

      {/* Article Description */}
      <div
        className="flex flex-col gap-4 p-5 mb-3 font-normal text-gray-700"
        style={{ fontSize: "1.2rem" }}
      >
        {article.description}
      </div>
    </div>
  );
}
