import type { NextPage } from "next";
// import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import PlayGround from "../components/PlayGround";
import Character from "../components/Character";
import Staking from "../components/Staking";

const Home: NextPage = () => {
  return (
    <div>
      <Character></Character>
      <Staking></Staking>
      <Header></Header>
      <PlayGround></PlayGround>
    </div>
  );
};

export default Home;
