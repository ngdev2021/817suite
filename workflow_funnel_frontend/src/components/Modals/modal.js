import Modal from 'react-modal';

const WorkflowModal = ({ isOpen, onRequestClose, workflow }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className="p-8 bg-white rounded-lg shadow-lg max-w-lg mx-auto"
  >
    <h2 className="text-xl font-bold mb-4">Edit Workflow</h2>
    <input
      type="text"
      defaultValue={workflow.name}
      className="w-full px-4 py-2 border rounded mb-4"
    />
    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Save
    </button>
  </Modal>
);

export default WorkflowModal;
