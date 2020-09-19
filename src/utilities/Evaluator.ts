const evaluate = (code: string, args = {}) => {
    // Call is used to define where "this" within the evaluated code should reference.
    // eval does not accept the likes of eval.call(...) or eval.apply(...) and cannot
    // be an arrow function
    return function evaluateEval() {
        // Create an args definition list e.g. "arg1 = this.arg1, arg2 = this.arg2"
        const argsStr = Object.keys(args)
            .map(key => `${key} = this.${key}`)
            .join(',');
        const argsDef = argsStr ? `let ${argsStr};` : '';

        return eval(`${argsDef}${code}`);
    }.call(args);
};

export default evaluate;