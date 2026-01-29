interface Stat {
  tasks: any;
  completedTasks: number;
  activeTasks: number;
  overdueTasks: number;
}

const Stats = ({ tasks, completedTasks, activeTasks, overdueTasks }: Stat) => {
  return (
    <>
      <div className="mb-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Total:</span>
              <span className="font-bold text-gray-800">{tasks.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Completed:</span>
              <span className="font-bold text-green-600">{completedTasks}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Active:</span>
              <span className="font-bold text-blue-600">{activeTasks}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Overdue:</span>
              <span className="font-bold text-red-600">{overdueTasks}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
