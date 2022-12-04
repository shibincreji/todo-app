import React, { useCallback, useEffect, useRef, useState } from "react";
import { useGlobalState } from "../../context";
import check from "../../images/icon-check.svg";
import cross from "../../images/icon-cross.svg";

const Todo = ({ todo, index }) => {
    const { setTodos, filter } = useGlobalState();
    const [isDeleting, setIsDeleting] = useState(false);
    const [clickedPoint, setClickedPoint] = useState(null);
    const todoRef = useRef();

    const deleteTodo = () => {
        setIsDeleting(true);
        setTimeout(() => {
            setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
        }, 300);
    };

    const setComplete = () => {
        setTodos((prevTodos) =>
            prevTodos.map((t) =>
                t.id === todo.id ? { ...t, completed: !t.completed } : t
            )
        );
    };

    const reOrder = () => {
        const y = +todoRef.current.style.top.replace(/px/, "");
        const { height } = todoRef.current.getBoundingClientRect();

        if (y > height) {
            setTodos((todos) => [
                ...todos.slice(0, index),
                ...todos.slice(index + 1, index + Math.ceil(y / height)),
                todo,
                ...todos.slice(index + Math.ceil(y / height)),
            ]);
        } else if (y < -height) {
            setTodos((todos) => [
                ...todos.slice(0, index - Math.floor(y / -height)),
                todo,
                ...todos.slice(index - Math.floor(y / -height), index),
                ...todos.slice(index + 1),
            ]);
        }
    };

    const mouseDown = (e) => {
        todoRef.current.style.cursor = "grabbing";
        todoRef.current.style["z-index"] = "1";
        setClickedPoint({ x: e.clientX, y: e.clientY });
        document.body.style.userSelect = "none";
    };

    const mouseMove = useCallback(
        (e) => {
            const { x, y } = clickedPoint;
            todoRef.current.style.left = `${e.clientX - x}px`;
            todoRef.current.style.top = `${e.clientY - y}px`;

            //rearrange

            const __y = +todoRef.current.style.top.replace(/px/, "");
            const { height } = todoRef.current.getBoundingClientRect();
            if (
                __y > height &&
                todoRef.current.parentNode.childNodes[
                    index + Math.floor(__y / height)
                ]
            ) {
                todoRef.current.parentNode.childNodes[
                    index + Math.floor(__y / height)
                ].style.top = `-${height}px`;
            }
            if (
                __y < -height &&
                todoRef.current.parentNode.childNodes[
                    index - Math.floor(__y / -height)
                ]
            ) {
                todoRef.current.parentNode.childNodes[
                    index - Math.floor(__y / -height)
                ].style.top = `${height}px`;
            }
        },
        //eslint-disable-next-line
        [clickedPoint]
    );

    const mouseUp = (e) => {
        document.removeEventListener("mousemove", mouseMove);
        todoRef.current.style.cursor = "grab";
        reOrder();
        todoRef.current.style.left = "0";
        todoRef.current.style.top = "0";
        todoRef.current.style["z-index"] = "0";
    };

    useEffect(() => {
        document.addEventListener("mouseup", mouseUp);
        return () => {
            document.removeEventListener("mouseup", mouseUp);
        };
    });

    useEffect(() => {
        if (clickedPoint) {
            document.addEventListener("mousemove", mouseMove);
        }
    }, [clickedPoint, mouseMove]);

    return (
        <li
            className={
                isDeleting
                    ? "todo deleting"
                    : todo.completed
                    ? "todo completed"
                    : "todo"
            }
            ref={todoRef}
            onMouseDown={(e) => filter === "all" && mouseDown(e)}
        >
            <button className="todo__circle " onClick={setComplete}>
                <img src={check} alt="check" />
            </button>
            <h2 className="todo__title">{todo.text}</h2>
            <button
                className="todo__delete"
                aria-label="delete"
                onClick={deleteTodo}
            >
                <img src={cross} alt="cross" />
            </button>
        </li>
    );
};

export default Todo;
