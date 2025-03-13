import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  About,
  Cocktail,
  Error,
  HomeLayout,
  Landing,
  NewsLetter,
} from "./pages";
import { loader as landingLoader } from "./pages/Landing";
import { loader as cocktailLoader } from "./pages/Cocktail";
import { action as newsLetterAction } from "./pages/NewsLetter";
import SinglePageError from "./pages/SinglePageError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: landingLoader,
        errorElement: <SinglePageError />,
        element: <Landing />,
      },
      {
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        loader: cocktailLoader,
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        action: newsLetterAction,
        element: <NewsLetter />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
