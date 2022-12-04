import React, { useState } from "react";
import { useGlobalState } from "../../context";

const Input = () => {
    const [inputText, setInputText] = useState("");
    const { setTodos } = useGlobalState();

    const addTodo = (e) => {
        e.preventDefault();
        if (inputText.trim()) {
            setTodos((prevTodos) => [
                ...prevTodos,
                {
                    text: inputText,
                    completed: false,
                    id: prevTodos.at(-1)?.id + 1 || 0,
                },
            ]);
        }
        setInputText("");
    };

    return (
        <form className="todoForm" onSubmit={addTodo}>
            <div className="todoForm__circle"></div>
            <input
                type="text"
                className="todoForm__input"
                placeholder="Create a new todo..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />
        </form>
    );
};

export default Input;
