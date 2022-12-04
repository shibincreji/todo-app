import { Fragment } from "react";
import Header from "./components/header/Header";
import Input from "./components/input/Input";
import Todos from "./components/todos/Todos";
import { useGlobalState } from "./context";
import "./scss/index.css";

function App() {
    const { isDark } = useGlobalState();
    return (
        <main className={isDark ? "app dark" : "app light"}>
            <div className="app__hero" />
            <section className="container">
                <Header />
                <Input />
                <Todos />
            </section>
            <footer className="app__footer">
                Drag and drop to reorder list
            </footer>
            <div>&nbsp;</div>
            <Fragment>&nbsp;</Fragment>
            <footer className="app__footer"><p>
          Developed with ❤️ by <span><a href="https://github.com/shibincreji">Shibin C Reji</a></span>.
        </p></footer>
        </main>
    );
}

export default App;
