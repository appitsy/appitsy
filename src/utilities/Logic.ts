import { BaseComponentProps } from "../types/ComponentSchema";
import evaluate from "./Evaluator";

const EvaluateLogic = (component: BaseComponentProps, state: any) => {
  let value = undefined;
  const schema = {};

  component.logic
    ?.filter((x) => evaluate(x.trigger, { state, component }))
    .flatMap((x) => x.actions)
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
