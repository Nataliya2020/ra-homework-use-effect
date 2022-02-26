import {useState} from "react";
import Details from "./Details";
import PropTypes from 'prop-types';

function List(props) {
  const [clickFlag, setClickFlag] = useState(false);
  const [info, setInfo] = useState({});

  const handlerClick = (evt, id, name) => {
    setInfo({
      id: id,
      name: name
    })
    setClickFlag(true);
  }

  return (
    <>
      <ul className={"list"}>
        {props.item.map((item) => {
          return <li className={"list-item"} key={item.id} onClick={(evt) => handlerClick(evt, item.id, item.name)}>
            {item.name}
          </li>
        })}
      </ul>
      {clickFlag && <Details info={info}/>}
    </>
  )
}

List.propTypes = {
  item: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  }))
}

List.defaultProps = {
  item: PropTypes.arrayOf(PropTypes.shape({
    id: 0,
    name: ''
  }))
}

export default List;
