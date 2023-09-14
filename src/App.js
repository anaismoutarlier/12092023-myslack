import { useFirebase, FirebaseContext } from "./firebase";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

function App() {
  const firebase = useFirebase();
  return (
    <FirebaseContext.Provider value={firebase}>
      {firebase?.user ? <Chat /> : <Login />}
    </FirebaseContext.Provider>
  );
}

export default App;
