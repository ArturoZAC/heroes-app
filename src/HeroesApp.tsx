import { RouterProvider } from "react-router";
import { appRouter } from "./router/AppRouter";

export const HeroesApp = () => {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
};
