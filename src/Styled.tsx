import { theme } from "./Theme";
import styled, { CreateStyled } from "@emotion/styled";

export type ThemeType = typeof theme;

export default styled as CreateStyled<ThemeType>;