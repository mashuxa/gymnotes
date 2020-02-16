import React, {useState} from 'react';
import ExerciseConfigurator from "../../components/ExerciseConfigurator";
import Button from "../../components/Button";

export default (props) => {
  const [isVisibleConfigurator, toggleConfigurator] = useState(false);

  return <React.Fragment>
    <h1>Exercise List</h1>
    <Button type="add" handleClick={() => toggleConfigurator(true)}/>
    {isVisibleConfigurator && <ExerciseConfigurator hideConfigurator={()=> toggleConfigurator(false)}/>}
  </React.Fragment>
}
