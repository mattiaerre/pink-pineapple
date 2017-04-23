function getParams(component) {
  const params = {};
  if (component.oc.parameters) {
    Object.keys(component.oc.parameters).forEach((key) => {
      if (component.oc.parameters[key].mandatory) {
        params[key] = component.oc.parameters[key].example;
      }
    });
  }

  return params;
}

module.exports = getParams;
