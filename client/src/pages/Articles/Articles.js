import React, { Component } from "react";
import API from "../../utils/API";
//import Header from "../../components/Header";
import { Link } from "react-router-dom";
import {List, ListItem} from "../../components/List";
//import { Col, Row, Container } from "../../components/Grid";


class Articles extends Component {
    state = {
      articles: [],
      title: "",
      author: "",
      source: "",
      textBody: "",
    };

    componentDidMount(){
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({ articles: res.data, title: "", author: "", source: "", textBody: "" })
            )
            .catch(err => console.log(err));
    };

    render() {
        return (

            this.state.aritcles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                      <Link to={"/articles/" + article._id}>
                        <strong>
                          {article.title} by {article.author}
                        </strong>
                      </Link>
                      
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
            )
        );
      }



}

export default Articles;