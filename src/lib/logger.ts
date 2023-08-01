function success(...args: any[]) {
  console.log('%c SUCCESS ', 'background: #38A169; color: #FFFFFF', ...args);
}

function log(...args: any[]) {
  console.log('%c LOG ', 'background: #3182ce; color: #FFFFFF', ...args);
}

function error(...args: any[]) {
  console.log('%c ERROR ', 'background: #E53E3E; color: #FFFFFF', ...args);
}

const logger = {
  log,
  success,
  error,
};

export default logger;
