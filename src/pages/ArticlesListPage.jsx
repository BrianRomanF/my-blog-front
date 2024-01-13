import { useState, useEffect } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import ArticleList from "../components/ArticlesList";
import useUser from "../hooks/useUser";

const ArticlesListPage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: false,
    content: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user, isLoading } = useUser();

  useEffect(() => {
    const loadArticleInfo = async () => {
      try {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        const response = await axios.get(`https://react-blog-app-0b1u.onrender.com/api/articles`, {
          headers,
        });
        const newArticleInfo = response.data;
        console.log("response", response.data)
        setArticleInfo(newArticleInfo);
      } catch (error) {
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (!isLoading) {
      loadArticleInfo();
    }
  }, [user, isLoading]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>Articles</h1>
      <ArticleList articles={articleInfo} />
    </>
  );
};

export default ArticlesListPage;
