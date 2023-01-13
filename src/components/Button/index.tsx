import { Button } from "@mui/material";

interface Props {
  label: string;
  handleClick?: () => void;
  nameClass?: string;

}

function ButtonControl(props: Props) {
  const { label, handleClick, nameClass} = props;

  return (

    <Button variant="contained" className={nameClass} onClick={handleClick}> {label}</Button>

  );
}

export default ButtonControl;
