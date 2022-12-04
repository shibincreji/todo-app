import React from "react";
import { useGlobalState } from "../../context";

const FooterButton = ({ title }) => {
    const { setFilter, filter } = useGlobalState();
    return (
        <button
            className={filter === title ? "active" : ""}
            onClick={() => setFilter(title)}
        >
            {title}
        </button>
    );
};

const Footer = () => {
    const { todos, setTodos } = useGlobalState();
    const clearCompleted = () => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    };

    return (
        <footer className="footer">
            <p className="footer__total">
                {todos.filter((todo) => !todo.completed).length} items left
            </p>
            <div className="footer__filter">
                <FooterButton title="all" />
                <FooterButton title="active" />
                <FooterButton title="completed" />
            </div>
            <button className="footer__clear" onClick={clearCompleted}>
                Clear Completed
            </button>
        </footer>
    );
};

export default Footer;
