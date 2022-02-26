import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import PropTypes from "prop-types";

function Details(props) {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/${props.info.id}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      }).then((data) => {
      setUserData(data);
      setLoading(false);
    })
      .catch(e => {
        setLoading(false);
        setError(true);
      })
  }, [props.info.id]);

  if (loading) {
    return (<div>Loading....</div>);
  }

  if (error) {
    return (<div>Что-то пошло не так</div>)
  }

  return (
    <>
      {!error && userData.name &&
        <ul className={"list"}>
          <li className={"list-item-img"}>
            <img className={"item-img"} src={userData.avatar} alt={"avatar"}/>
          </li>
          <li className={"list-item border-top text-item"}>
            {userData.name}
          </li>
          {Object.keys(userData.details).map((item => {
            return (<li className={"list-item"} key={uuid()}>
              {item + ': ' + userData.details[item]}
            </li>)
          }))}
        </ul>
      }
    </>
  );
}

Details.propTypes = {
  info: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })
}

Details.defaultProps = {
  info: PropTypes.shape({
    id: 0,
    name: ''
  })
}

export default Details;
