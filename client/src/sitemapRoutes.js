import React from "react";
import { Route } from "react-router";

export default (
  <Route path="/">
    <Route index />
    <Route path="login" />
    <Route path="join" />
    <Route path="admin" />
    <Route path="my-page/:id" />
    <Route path="my-page/:id/edit" />
    <Route path="/:id/quiz/create_quiz" />
    <Route path="quiz/edit/:id" />
    <Route path="quiz/:id" />
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
    <Route path="/result/:id" />
    <Route path="/not" />
    <Route path="*" />
  </Route>
);
