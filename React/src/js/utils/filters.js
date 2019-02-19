export {
  leaveOnlyActive,
  leaveOnlyCompleted,
}

function leaveOnlyActive(todo){ return !todo.isReady };
function leaveOnlyCompleted(todo){ return todo.isReady };
