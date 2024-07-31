import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { deleteArticle, getArticles } from "../helpers/ArticlesCRUD";
import ArticlePreview from "../components/ArticlePreview";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Fetch Articles
  useEffect(() => {
    async function fetchArticles() {
      const data = await getArticles();
      setArticles(data);
      // console.log(data);
    }

    fetchArticles();
  }, []);
  /* -------------------------------------------------------------------------- */

  // Handle Delete
  async function handleDel(id, user) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );
    if (confirmed) {
      await deleteArticle(id, user);
      setArticles(articles.filter((article) => article.id !== id));
    }
  }
  /* -------------------------------------------------------------------------- */

  return (
    <>
      {currentUser ? (
        <button
          className="fixed bottom-4 right-4  bg-blue-700 text-white font-normal text-lg py-2 px-4 rounded-full heigh shadow-lg hover:bg-blue-600 transition duration-300"
          onClick={() => {
            navigate("/article-update");
          }}
        >
          Add an article
        </button>
      ) : null}
      {articles.map((article) => {
        return (
          <ArticlePreview
            key={article.id}
            handleDel={handleDel}
            article={article}
            user={currentUser}
          />
        );
      })}
    </>
  );
}
