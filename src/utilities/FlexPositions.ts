import { ErrorPosition, LabelPosition } from "../types/ComponentSchema";

export const errorPositionToFlexDirection = (errorPosition: ErrorPosition | undefined) => errorPosition === 'right' ? 'row' : 'column';

export const labelPositionToFlexDirection = (labelPosition: LabelPosition | undefined) => labelPosition === 'top' ? 'column' : 'row';