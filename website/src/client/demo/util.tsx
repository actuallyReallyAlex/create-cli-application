export const clearDemo = (): void => {
  const childNode = document.getElementById('demo').firstChild;
  document.getElementById('demo').removeChild(childNode);
};
