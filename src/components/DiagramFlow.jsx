import React, { useContext, useEffect } from 'react';
import ReactFlow, { Background, Controls, addEdge, useEdgesState, useNodesState } from 'react-flow-renderer'; 
import 'react-flow-renderer/dist/style.css';

import { DiagramContext } from '../context/DiagramContext';

const DiagramFlow = () => {
  const { diagramData } = useContext(DiagramContext);

 const [nodes, setNodes, onNodesChange] = useNodesState([]);  
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

 
  useEffect(() => {
    setNodes(diagramData.nodes);
    setEdges(diagramData.edges);
  }, [diagramData, setNodes, setEdges]);

  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  return (
    <div className="react-flow-container" style={{ width: '100%', height: '80vh', border: '1px solid #ccc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Background variant="lines" />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default DiagramFlow;





