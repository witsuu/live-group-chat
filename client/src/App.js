import { BrowserRouter as Router, Route } from "react-router-dom";
import { Join, Invite } from "./components/Join";
import { Chat } from "./components/Chats";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/invite" component={Invite} />
    </Router>
  );
}

export default App;
