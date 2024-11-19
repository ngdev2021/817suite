import Card from './Card';

const WorkflowCard = ({ workflow }) => (
  <Card
    title={workflow.name}
    gradient={{ from: 'blue-500', via: 'teal-500', to: 'green-500' }}
  >
    <div className="text-sm">
      <div className="mb-2">
        <span className="font-semibold">Triggers:</span>
        <ul className="list-disc ml-5 mt-1">
          {workflow.triggers &&
          Object.keys(workflow.triggers).length > 0 ? (
            Object.keys(workflow.triggers).map((trigger, index) => (
              <li key={index} className="text-gray-100">
                {trigger}
              </li>
            ))
          ) : (
            <li className="text-gray-100">No triggers defined</li>
          )}
        </ul>
      </div>
      <div>
        <span className="font-semibold">Actions:</span>
        <ul className="list-disc ml-5 mt-1">
          {workflow.actions &&
          Object.keys(workflow.actions).length > 0 ? (
            Object.keys(workflow.actions).map((action, index) => (
              <li key={index} className="text-gray-100">
                {action}
              </li>
            ))
          ) : (
            <li className="text-gray-100">No actions defined</li>
          )}
        </ul>
      </div>
    </div>
    <div className="flex justify-between items-center mt-4">
      <span
        className={`text-xs px-3 py-1 rounded-full font-bold ${
          workflow.status === 'active'
            ? 'bg-green-100 text-green-900'
            : 'bg-red-100 text-red-900'
        }`}
      >
        {workflow.status}
      </span>
      <button className="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-gray-100">
        View Workflow
      </button>
    </div>
  </Card>
);

export default WorkflowCard;
