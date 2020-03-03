import React, {useState} from 'react';
import {TYPES} from "../../constants";
import Button from "../../components/Button";
import './style.scss';

export default (props) => {
  const {type, name, values: defaultValues} = props.data;
  const params = Object.keys(TYPES[type].params);
  const [values, setValues] = useState(defaultValues);

  return (
    <article className="exercise">
      <div className="exercise__column">
        <h1>{name}</h1>
        <span>{TYPES[type].name}</span>
      </div>
      <div className="exercise__column">
        {params.map((param) => {
          const {name, unit} = TYPES[type].params[param];
          const updateValue = (e) => {
            const newValues = {...values, [param]: e.currentTarget.value};

            props.onChange(newValues);
            setValues(newValues);
          };

          if (props.isEditable) {
            return <label className="exercise__label" key={param}>
              <span>{name}:</span>
              <input className="exercise__input" type="number" value={values[param]} onChange={updateValue}/>
              <span className="exercise__unit">{unit}</span>
            </label>
          }

          return <p key={param}>{`${name}: ${values[param]} ${unit}`}</p>
        })}
      </div>
      <div className="exercise__btn-wrapper">
        {props.isEditable ?
          <Button className="exercise__btn" type="delete" onClick={props.removeFromTraining} title="Remove"/> :
          <Button className="exercise__btn" type="add" onClick={props.addToTraining} title="add to current training"/>
        }
      </div>
    </article>
  );
}
