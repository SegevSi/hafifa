import Dishes from "../../../components/Dishes";// todo maybe give it better name unit it with child
import styles from "../../../styles/Home.module.css";
import AddDishForm from "@/components/AddDishForm";


export default function Home() {
  
    return (
        <div className={styles.home}>
            <AddDishForm/>
            <Dishes/>
        </div>
    );
}