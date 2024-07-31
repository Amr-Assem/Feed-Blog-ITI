import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  addArticle,
  getArticleById,
  updateArticle,
} from "../helpers/ArticlesCRUD";
import { useParams } from "react-router-dom";
import Input from "../components/Input";

export default function ArticleUpdate() {
  const imageRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const { currentUser } = useAuth();

  const [article, setArticle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch Article Details (Edit Mode)
  const { id } = useParams();
  if (id) {
    useEffect(() => {
      async function fetchArticle() {
        const data = await getArticleById(id);
        setArticle(data);
        // console.log(data);
      }

      fetchArticle();
    }, []);
  }
  /* -------------------------------------------------------------------------- */

  // Handle Create
  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);

    if (currentUser) {
      await addArticle(
        imageRef.current.value,
        titleRef.current.value,
        descriptionRef.current.value,
        currentUser
      );
      navigate("/");
    } else {
      setError("User must be logged in to add an article.");
    }
    setLoading(false);
  }
  /* -------------------------------------------------------------------------- */

  // Handle Edit
  async function handleEdit(e) {
    e.preventDefault();
    setLoading(true);

    if (currentUser) {
      await updateArticle(
        id,
        {
          image: imageRef.current.value,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
        },
        currentUser
      );
      navigate("/");
    } else {
      setError("User must be logged in to add an article.");
    }
    setLoading(false);
  }
  /* -------------------------------------------------------------------------- */

  return (
    <form
      className="flex flex-col max-w-sm mx-auto my-2 p-8 bg-white border border-gray-200 rounded-3xl shadow"
      onSubmit={!id ? handleCreate : handleEdit}
    >
      {/* Form Header */}
      <h2 className="text-center text-2xl mb-2 font-medium tracking-tight text-gray-900">
        {!id ? "Add an Article" : "Edit Article"}
      </h2>

      {/* Image Input */}
      <Input
        type="text"
        title="Image URL"
        id="image"
        placeholder="https://..."
        ref={imageRef}
        defaultValue={!id ? null : article.image}
      />

      {/* Title Input */}
      <Input
        type="text"
        title="Title"
        id="title"
        placeholder="Article Title"
        ref={titleRef}
        defaultValue={!id ? null : article.title}
      />

      {/* Description Input */}
      <Input
        type="text"
        title="Description"
        id="description"
        placeholder="Article Description"
        ref={descriptionRef}
        defaultValue={!id ? null : article.description}
      />

      {/* Error Message */}
      {error && <Error message={error} />}

      {/* Submit --> Add */}
      <button
        type="submit"
        className="mt-6 mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        disabled={loading}
      >
        {!id ? "Add Article" : "Save Article"}
      </button>

      {/* Cancel */}
      <Link className="mx-auto text-red-700 hover:text-red-800" to="/">
        Cancel
      </Link>
    </form>
  );
}
