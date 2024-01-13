import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddArticleForm = ({ onArticleUpdated }) => {
  const [articleName, setArticleName] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const { user } = useUser();
  const [error, setError] = useState(null);

  const addArticle = async () => {
    try {
      // Validation
      if (!articleName || !articleTitle || !articleContent) {
        setError("Please fill in all fields.");
        return;
      }

      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.post(
        `/api/articles`,
        {
          name: articleName,
          title: articleTitle,
          content: articleContent,
        },
        {
          headers,
        }
      );
      const updatedArticle = response.data;

      // Reset state
      setArticleName("");
      setArticleTitle("");
      setArticleContent("");
      setError(null);

      // Set success message
      setSuccessMessage("Article successfully added!");

      // Callback to inform parent component
      if (onArticleUpdated) {
        onArticleUpdated(updatedArticle);
      }
    } catch (error) {
      console.error("Error adding article:", error);
      setError("An error occurred while adding the article.");
    }
  };

  return (
    <div id="add-comment-form">
      <label>Article Name: </label>
      <textarea
        value={articleName}
        onChange={(e) => setArticleName(e.target.value)}
        rows="1"
        cols="50"
      />
      <label>Article Title: </label>
      <textarea
        value={articleTitle}
        onChange={(e) => setArticleTitle(e.target.value)}
        rows="1"
        cols="50"
      />
      <label>Article Content: </label>
      <p>Separate your articles with ";"</p>
      <textarea
        value={articleContent}
        onChange={(e) => setArticleContent(e.target.value)}
        rows="4"
        cols="50"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <button onClick={addArticle}>Add Article</button>
    </div>
  );
};

export default AddArticleForm;
