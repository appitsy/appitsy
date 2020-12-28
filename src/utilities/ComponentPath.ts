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

export const getRelativeComponentPath = (childName: string, parentPath?: string, componentPath?: string): string => {
  const root = '$';
  const rootPrefix = '$.';

  if (componentPath?.length === 0) {
    return appendComponentPath(parentPath, childName);
  }

  if (componentPath === root) {
    // send the root path
    return '';
  }

  if (componentPath?.startsWith(rootPrefix)) {
    // absolute path given. return it
    return componentPath.slice(rootPrefix.length);
  }

  // TODO: get a relative path from the parent path to the path specified.
  return appendComponentPath(parentPath, childName);
};
