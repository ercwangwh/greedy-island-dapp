import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import PlayGround from "../components/PlayGround";

const Home: NextPage = () => {
  return (
    <div>
      <Header></Header>
      <PlayGround></PlayGround>
    </div>
  );
};

export default Home;
