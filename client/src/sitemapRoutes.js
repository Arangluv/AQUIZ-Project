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
    <Route path="/guideline" />
    <Route path="/about" />
    <Route path="/result/:id" />
    <Route path="/not" />
    <Route path="*" />
  </Route>
);
