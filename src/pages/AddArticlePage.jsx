import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import CommentsList from "../components/CommentsList";
import AddArticleForm from "../components/AddArticleForm";
import useUser from "../hooks/useUser";

const AddArticlePage = () => {
  const { user, isLoading } = useUser();
  const [articles, setArticles] = useState([]);

  // Callback function to handle article update
  const handleArticleUpdated = (newArticle) => {
    // Update the state with the new article
    setArticles((prevArticles) => [...prevArticles, newArticle]);
  };

  return (
    <>
      <h1>Add a New Article!</h1>
      {user ? (
        <AddArticleForm onArticleUpdated={handleArticleUpdated} />
      ) : (
        <button>Log in to add an Article</button>
      )}
    </>
  );
};

export default AddArticlePage;
