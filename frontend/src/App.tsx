import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import { chatLoader } from "./loaders";
import { CurrentUserProvider } from "./CurrentUserContext";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/chat",
    loader: chatLoader,
    element: (
      <CurrentUserProvider>
        <Chat />
      </CurrentUserProvider>
    ),
  },
]);

function App() {
  return (
    <>
      <div>hello</div>
    </>
  );
}

export default App;
