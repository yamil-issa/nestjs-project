import React, { useEffect, useState } from "react";
import "../styles/BoardPage.css";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Board = () => {
  const location = useLocation();
  const [userId, setUserId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [username, setUsername] = useState<string>("");
  const token = location.state && location.state.token;

  useEffect(() => {
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userIdFromToken = decodedToken.userId;
      const usernameFromToken = decodedToken.username;
      setUserId(userIdFromToken);
      setUsername(usernameFromToken);
    }
  }, [location.state]);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/tasks/${userId}`);
          const data = response.data;
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  return (
    <>
    <h2>Welcome {username}</h2>
    <div className="board_container">
      <div className="todo_column">
        <h2>Todo</h2>
        <div className="task_container">
          {tasks.map((task) => (
            <div key={task._id} className="task">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="done_column">
        <h2>Done</h2>
        <div className="task_container">
          {/* Render done tasks here */}
        </div>
      </div>
    </div></>
  );
};

export default Board;
