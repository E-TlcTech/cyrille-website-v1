import { v4 as uuidv4 } from "uuid";

// Client Storage
export const getClients = () => {
  if (typeof window === "undefined") return [];
  const clients = localStorage.getItem("clients");
  return clients ? JSON.parse(clients) : [];
};

export const saveClient = (client) => {
  const clients = getClients();
  const newClient = {
    ...client,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem("clients", JSON.stringify([...clients, newClient]));
  return newClient;
};

export const updateClient = (id, updatedClient) => {
  const clients = getClients();
  const updatedClients = clients.map((client) =>
    client.id === id
      ? {
          ...client,
          ...updatedClient,
          updatedAt: new Date().toISOString(),
        }
      : client
  );
  localStorage.setItem("clients", JSON.stringify(updatedClients));
};

export const deleteClient = (id) => {
  const clients = getClients();
  const filteredClients = clients.filter((client) => client.id !== id);
  localStorage.setItem("clients", JSON.stringify(filteredClients));
};

// Project Storage
export const getProjects = () => {
  if (typeof window === "undefined") return [];
  const projects = localStorage.getItem("projects");
  return projects ? JSON.parse(projects) : [];
};

export const saveProject = (project) => {
  const projects = getProjects();
  const newProject = {
    ...project,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem("projects", JSON.stringify([...projects, newProject]));
  return newProject;
};

export const updateProject = (id, updatedProject) => {
  const projects = getProjects();
  const updatedProjects = projects.map((project) =>
    project.id === id
      ? {
          ...project,
          ...updatedProject,
          updatedAt: new Date().toISOString(),
        }
      : project
  );
  localStorage.setItem("projects", JSON.stringify(updatedProjects));
};

export const deleteProject = (id) => {
  const projects = getProjects();
  const filteredProjects = projects.filter((project) => project.id !== id);
  localStorage.setItem("projects", JSON.stringify(filteredProjects));
};

// File Storage (using localStorage to store base64 encoded files)
export const saveFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const files = getFiles();
      const newFile = {
        id: uuidv4(),
        name: file.name,
        type: file.type,
        size: file.size,
        data: reader.result,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem("files", JSON.stringify([...files, newFile]));
      resolve(newFile);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const getFiles = () => {
  if (typeof window === "undefined") return [];
  const files = localStorage.getItem("files");
  return files ? JSON.parse(files) : [];
};

export const deleteFile = (id) => {
  const files = getFiles();
  const filteredFiles = files.filter((file) => file.id !== id);
  localStorage.setItem("files", JSON.stringify(filteredFiles));
};
