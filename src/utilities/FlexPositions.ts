import { ErrorPosition, LabelPosition } from "../types/ComponentSchema";

export const errorPositionToFlexDirection = (errorPosition: ErrorPosition | undefined) => errorPosition === 'right' ? 'row' : 'column';

// default to top
export const labelPositionToFlexDirection = (labelPosition: LabelPosition | undefined) => labelPosition === 'left' ? 'row' : 'column';