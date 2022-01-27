import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Quiz from "./pages/Quiz/Quiz";
import Home from "./pages/Home/Home";
import AdminQuizList from "./pages/AdminQuizList/AdminQuizList";
import NoMatch from "./components/NoMatch/NoMatch";
import QuizAdmin from "./pages/AdminQuiz/AdminQuiz";
import AdminQuestion from "./pages/AdminQuestion/AdminQuestion";
import AdminNewQuiz from "./pages/AdminNewQuiz/AdminNewQuiz";
import RouteGuard from "./components/RouteGuard/RouteGuard";
import AdminQuestionList from "./pages/AdminQuestionList/AdminQuestionList";
import { appRoles } from "./authConfig";
import { MsalProvider } from "@azure/msal-react";
import { IPublicClientApplication } from "@azure/msal-browser";
type AppProps = {
  pca: IPublicClientApplication;
};
function App({ pca }: AppProps): JSX.Element {
  return (
    <MsalProvider instance={pca}>
      <Pages />
    </MsalProvider>
  );
}
function Pages() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <RouteGuard path="/admin/question/:questionId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})" roles={[appRoles.Admin]} component={AdminQuestion} />
        <RouteGuard path="/admin/questions" roles={[appRoles.Admin]} component={AdminQuestionList} />
        <RouteGuard path="/admin/question" roles={[appRoles.Admin]} component={AdminQuestion} />
        <RouteGuard
          path="/admin/quiz/:quizId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/question"
          roles={[appRoles.Admin]}
          component={AdminQuestion}
        />
        <RouteGuard
          path="/admin/quiz/:quizId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/questions/create"
          roles={[appRoles.Admin]}
          component={AdminQuestion}
        />
        <RouteGuard
          path="/admin/quiz/:quizId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/question/:questionId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})"
          roles={[appRoles.Admin]}
          component={AdminQuestion}
        />
        <RouteGuard
          path="/admin/quiz/:quizId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})/questions/:questionId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})"
          roles={[appRoles.Admin]}
          component={AdminQuestion}
        />
        <RouteGuard path="/admin/quiz/:quizId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})" roles={[appRoles.Admin]} component={QuizAdmin} />
        <RouteGuard exact path="/admin/quizzes" roles={[appRoles.Admin]} component={AdminQuizList} />
        <RouteGuard path="/admin/quiz" roles={[appRoles.Admin]} component={AdminNewQuiz} />
        <Route path="/quiz/:quizId(\w{8}-\w{4}-\w{4}-\w{4}-\w{12})" component={Quiz} />
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default App;