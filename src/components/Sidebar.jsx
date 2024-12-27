

import React, { useContext, useState } from 'react';
import { DiagramContext } from '../context/DiagramContext';

const Sidebar = () => {
  const { diagramData, setDiagramData } = useContext(DiagramContext);
  const [nodeData, setNodeData] = useState({ id: '', label: '', x: 0, y: 0 });
  const [edgeData, setEdgeData] = useState({ source: '', target: '' });

  // Add Node
  const addNode = () => {
    if (!nodeData.id || !nodeData.label || isNaN(nodeData.x) || isNaN(nodeData.y)) {
      alert('Please provide valid node details.');
      return;
    }
    if (diagramData.nodes.some((node) => node.id === nodeData.id)) {
      alert('Node ID must be unique.');
      return;
    }
    const newNode = {
      id: nodeData.id.trim(),
      data: { label: nodeData.label.trim() },
      position: { x: parseInt(nodeData.x, 10), y: parseInt(nodeData.y, 10) },
    };
    setDiagramData((prevData) => ({
      ...prevData,
      nodes: [...prevData.nodes, newNode],
    }));
    setNodeData({ id: '', label: '', x: 0, y: 0 });
  };

  // Add Edge
  const addEdge = () => {
    if (!edgeData.source || !edgeData.target) {
      alert('Please provide valid source and target IDs for the edge.');
      return;
    }
    if (diagramData.edges.some((edge) => edge.id === `e${edgeData.source}-${edgeData.target}`)) {
      alert('Edge already exists.');
      return;
    }
    const newEdge = {
      id: `e${edgeData.source.trim()}-${edgeData.target.trim()}`,
      source: edgeData.source.trim(),
      target: edgeData.target.trim(),
    };
    setDiagramData((prevData) => ({
      ...prevData,
      edges: [...prevData.edges, newEdge],
    }));
    setEdgeData({ source: '', target: '' });
  };

  // Edit Node by ID
  const editNode = () => {
    const nodeIndex = diagramData.nodes.findIndex((node) => node.id === nodeData.id);
    if (nodeIndex === -1) {
      alert('Node not found.');
      return;
    }
    const updatedNode = {
      id: nodeData.id.trim(),
      data: { label: nodeData.label.trim() },
      position: { x: parseInt(nodeData.x, 10), y: parseInt(nodeData.y, 10) },
    };
    const updatedNodes = [...diagramData.nodes];
    updatedNodes[nodeIndex] = updatedNode;

    setDiagramData((prevData) => ({
      ...prevData,
      nodes: updatedNodes,
    }));
    setNodeData({ id: '', label: '', x: 0, y: 0 });
  };

  // Edit Edge by Source and Target IDs
  const editEdge = () => {
    const edgeIndex = diagramData.edges.findIndex((edge) => edge.source === edgeData.source && edge.target === edgeData.target);
    if (edgeIndex === -1) {
      alert('Edge not found.');
      return;
    }
    const updatedEdge = {
      id: `e${edgeData.source.trim()}-${edgeData.target.trim()}`,
      source: edgeData.source.trim(),
      target: edgeData.target.trim(),
    };
    const updatedEdges = [...diagramData.edges];
    updatedEdges[edgeIndex] = updatedEdge;

    setDiagramData((prevData) => ({
      ...prevData,
      edges: updatedEdges,
    }));
    setEdgeData({ source: '', target: '' });
  };

  // Delete Node by ID
  const deleteNode = () => {
    const nodeIndex = diagramData.nodes.findIndex((node) => node.id === nodeData.id);
    if (nodeIndex === -1) {
      alert('Node not found.');
      return;
    }
    const updatedNodes = diagramData.nodes.filter((node) => node.id !== nodeData.id);
    const updatedEdges = diagramData.edges.filter((edge) => edge.source !== nodeData.id && edge.target !== nodeData.id);

    setDiagramData((prevData) => ({
      ...prevData,
      nodes: updatedNodes,
      edges: updatedEdges,
    }));
    setNodeData({ id: '', label: '', x: 0, y: 0 });
  };

  // Delete Edge by Source and Target IDs
  const deleteEdge = () => {
    const edgeIndex = diagramData.edges.findIndex((edge) => edge.source === edgeData.source && edge.target === edgeData.target);
    if (edgeIndex === -1) {
      alert('Edge not found.');
      return;
    }
    const updatedEdges = diagramData.edges.filter((edge) => edge.source !== edgeData.source || edge.target !== edgeData.target);
    setDiagramData((prevData) => ({
      ...prevData,
      edges: updatedEdges,
    }));
    setEdgeData({ source: '', target: '' });
  };

  return (
    <div className="p-3 border bg-light">
      <h5>Add Node</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="ID"
        value={nodeData.id}
        onChange={(e) => setNodeData({ ...nodeData, id: e.target.value })}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Label"
        value={nodeData.label}
        onChange={(e) => setNodeData({ ...nodeData, label: e.target.value })}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="X"
        value={nodeData.x}
        onChange={(e) => setNodeData({ ...nodeData, x: e.target.value })}
      />
      <input
        type="number"
        className="form-control mb-2"
        placeholder="Y"
        value={nodeData.y}
        onChange={(e) => setNodeData({ ...nodeData, y: e.target.value })}
      />
      <button className="btn btn-primary w-100" onClick={addNode}>
        Add Node
      </button>
      <button className="btn btn-warning w-100 mt-2" onClick={editNode}>
        Edit Node
      </button>
      <button className="btn btn-danger w-100 mt-2" onClick={deleteNode}>
        Delete Node
      </button>

      <h5 className="mt-3">Add Edge</h5>
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Source ID"
        value={edgeData.source}
        onChange={(e) => setEdgeData({ ...edgeData, source: e.target.value })}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Target ID"
        value={edgeData.target}
        onChange={(e) => setEdgeData({ ...edgeData, target: e.target.value })}
      />
      <button className="btn btn-primary w-100" onClick={addEdge}>
        Add Edge
      </button>
      <button className="btn btn-warning w-100 mt-2" onClick={editEdge}>
        Edit Edge
      </button>
      <button className="btn btn-danger w-100 mt-2" onClick={deleteEdge}>
        Delete Edge
      </button>
    </div>
  );
};

export default Sidebar;
