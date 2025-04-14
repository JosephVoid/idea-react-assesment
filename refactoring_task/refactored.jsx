import { useQuery } from "@tanstack/react-query";
import React from "react";

const Dashboard = () => {
  const { data: users, isLoading: usersLoading } = useUsers();
  const { data: projects, isLoading: projectsLoading } = useProjects();

  return (
    <div>
      <h2>Dashboard</h2>
      {usersLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Users</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        </>
      )}
      {projectsLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3>Projects</h3>
          <ul>
            {projects.map((project) => (
              <li key={project.id}>{project.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://api.example.com/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });
};

const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch("https://api.example.com/projects");
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    },
  });
};

export default Dashboard;
