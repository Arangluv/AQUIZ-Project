import React from "react";
import { Route } from "react-router";
import fetch from "node-fetch";
const getUrl = async () => {
  const data = await fetch("http://localhost:4001/quizzes/allQuiz");
  const result = await data.json();
  const urlArray = await result.data.map((quiz) => {
    return quiz._id;
  });
  
  const temp = (
    <Route path="/">
      <Route index />
      <Route path="login" />
      <Route path="join" />
      {urlArray.map((url) => {
        return <Route path={`quiz/${url}`} />;
      })}
      <Route path="/faq" />
      <Route path="/contact" />
      <Route path="/article/important-factor" />
      <Route path="/article/learning" />
      <Route path="/article/helpful" />
      <Route path="/article/marketing" />
      <Route path="/article/caution" />
      <Route path="/article/shares" />
      <Route path="/article/common-usage" />
      <Route path="/article/make-funny" />
      <Route path="/article" />
      <Route path="/guideline" />
      <Route path="/about" />
    </Route>
  );
  return temp;
};
const getRoute = async () => {
  const route = await getUrl();
  return route;
};
export default getRoute();
