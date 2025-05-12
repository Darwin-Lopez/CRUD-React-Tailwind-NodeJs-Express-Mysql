import { createContext, useState } from "react";

const blogContext = createContext();

function BlogProviderWrapper(props) {
    const [posts, setPosts] = useState([]);

    const [error, setError] = useState(false);
    

    return (
        <blogContext.Provider value={{ posts, error, getPosts }}>
            {props.children}
        </blogContext.Provider>
    )
}

export { blogContext, BlogProviderWrapper }
