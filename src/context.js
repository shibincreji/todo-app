import { createContext, useContext, useEffect, useState } from "react";
import data from "./data.json";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        const localData = localStorage.getItem("todos");
        if (localData) {
            setTodos(JSON.parse(localData));
        } else setTodos([...data]);
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    return (
        <AppContext.Provider
            value={{ todos, setTodos, filter, setFilter, isDark, setIsDark }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalState = () => {
    return useContext(AppContext);
};
