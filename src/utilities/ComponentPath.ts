export const getParentComponentPath = (componentPath?: string): string | undefined => {
  if (componentPath === undefined) {
    return undefined;
  }

  const parentComponentPath = componentPath.split('.');
  parentComponentPath.pop();
  return parentComponentPath.join('.');
};

export const appendComponentPath = (parentPath: string | undefined, childName: string): string => {
  const path = parentPath || '';
  return (path.length !== 0) ? `${path}.${childName}` : childName;
};
