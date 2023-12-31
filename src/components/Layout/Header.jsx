import classes from "./Header.module.css";
import mealsImage from "../../assets/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
const Header = ({ onButtonClick }) => {
  return (
    <>
      <header className={classes.header}>
        <h1>React Meals App</h1>
        <HeaderCartButton showCartButtonHandler={onButtonClick} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
