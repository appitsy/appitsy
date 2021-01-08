import _ from 'lodash';

import {
  BaseComponentProps,
  LogicActionType,
} from '../types/BaseComponentSchema';
import evaluate from './Evaluator';

const EvaluateLogic = (component: BaseComponentProps, state: any): any => {
  let value;
  let schema;

  const triggers = component.logic?.filter((x) => evaluate(x.trigger, { state, component }));
  _.flatMap(triggers, trigger => trigger.actions)
    .forEach((x) => {
      switch (x.type) {
        case LogicActionType.SetProperty:
          schema = _.set(_.cloneDeep(component), x.property.path, x.property.value);
          break;
        case LogicActionType.UpdateComponent:
          schema = Object.assign(component, x.updateComponent || {});
          break;
        case LogicActionType.Value:
          value = evaluate(x.value || '', { ...component });
          break;
        default:
      }
    });

  const retVal: any = {};

  if (value) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    retVal.value = value;
  }

  if (schema) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    retVal.schema = schema;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return retVal;
};

export default EvaluateLogic;
