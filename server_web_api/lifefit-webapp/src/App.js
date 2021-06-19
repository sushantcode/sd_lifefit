import FitbitAuthentication from "./components/FitbitAuthentication";

function App() {
  const url = window.location.href;
  return (
    <div className="container">
        <FitbitAuthentication link={url} />
    </div>
  );
}

export default App;
