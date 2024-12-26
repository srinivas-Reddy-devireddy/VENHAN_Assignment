
const metadata = {
    nodes: [
      { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 50, y: 50 } },
      { id: '2', data: { label: 'Process' }, position: { x: 250, y: 100 } },
      { id: '3', type: 'output', data: { label: 'End' }, position: { x: 450, y: 150 } },
    ],
    edges: [
      { id: 'e1-2', source: '1', target: '2', animated: true },
      { id: 'e2-3', source: '2', target: '3' },
    ],
  };
  
  export default metadata;
  