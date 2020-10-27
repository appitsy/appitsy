import { BaseComponentProps } from "../types/ComponentSchema";
import evaluate from "./Evaluator";
import _ from 'lodash';

const EvaluateLogic = (component: BaseComponentProps, state: any) => {
  let value = undefined;
  const schema = {};

  const triggers = component.logic?.filter((x) => evaluate(x.trigger, { state, component }));
  _.flatMap(triggers, trigger => trigger.actions)
    .forEach((x) => {
      switch (x.type) {
        case "updateComponent":
          Object.assign(schema, x.schema || {});
          break;
        case "value":
          value = evaluate(x.value || "", { ...component });
          break;
      }
    });

  return {
    value,
    schema,
  };
};

export default EvaluateLogic;
