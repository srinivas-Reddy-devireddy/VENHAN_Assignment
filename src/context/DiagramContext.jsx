
import React, { createContext, useState } from 'react';

export const DiagramContext = createContext();

export const DiagramProvider = ({ children }) => {
  const [diagramData, setDiagramData] = useState({ nodes: [], edges: [] });

  return (
    <DiagramContext.Provider value={{ diagramData, setDiagramData }}>
      {children}
    </DiagramContext.Provider>
  );
};

