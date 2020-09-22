import { BaseComponentSchema } from "../types/ComponentSchema"
import evaluate from "./Evaluator";

const EvaluateLogic = (component: BaseComponentSchema, state: any) => {
    let value = undefined;
    const schema = {};

    component.logic?.filter(x => evaluate(x.value, { state, component }))
        .flatMap(x => x.actions)
        .forEach(x => {
            if (x.type === "updateComponent") {
                Object.assign(schema, x.schema || {});
            } else {
                value = evaluate(x.value || '', { ...component });
            }
        });

    return {
        value,
        schema,
    }
};

export default EvaluateLogic;