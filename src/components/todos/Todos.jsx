import React from "react";
import { useGlobalState } from "../../context";
import Footer from "../footer/Footer";
import Todo from "../todo/Todo";

const Todos = () => {
    const { todos, filter } = useGlobalState();

    const filteredTodos = todos.filter((todo) =>
        filter === "all"
            ? true
            : filter === "active"
            ? !todo.completed
            : todo.completed
    );

    return (
        <section className="todos">
            <ul>
                {filteredTodos.map((todo, index) => (
                    <Todo todo={todo} index={index} key={todo.id} />
                ))}
                {!filteredTodos.length && (
                    <div className="todos__empty">Nothing left to do</div>
                )}
            </ul>
            <Footer />
        </section>
    );
};

export default Todos;
