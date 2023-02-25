import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/api/articles");
  },
  // Gets the book with the given id
  getArticles: function(id) {
    return axios.get("/api/aritcles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/article/" + id);
  },
  // Saves an article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/article", articleData);
  }
};
