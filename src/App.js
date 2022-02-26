import './App.css';
import List from './components/List'
import {useState, useEffect} from "react";

function App() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch(e => {
        setLoading(false);
        setError(true);
      })
  }, [])

  if (loading) {
    return (<div>Loading....</div>);
  }

  if (error) {
    return (<div>Что-то пошло не так</div>);
  }

  return (
    <>
      {item !== null &&
        <div className={"container"}>
          {!error && !loading && <List item={item}/>}
        </div>
      }
    </>
  );
}

export default App;
