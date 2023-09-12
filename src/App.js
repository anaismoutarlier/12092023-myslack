import { useFirebase } from "./firebase";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

function App() {
  const { user, signin, signout } = useFirebase();
  return user ? (
    <Chat user={user} signout={signout} />
  ) : (
    <Login signin={signin} />
  );
}

export default App;
