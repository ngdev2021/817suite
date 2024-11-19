import WorkflowCard from './WorkflowCard';

const WorkflowList = ({ workflows }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {workflows.map((workflow) => (
      <WorkflowCard key={workflow.id} {...workflow} />
    ))}
  </div>
);

export default WorkflowList;
