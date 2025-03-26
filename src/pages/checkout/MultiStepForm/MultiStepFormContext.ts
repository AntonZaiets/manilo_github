import { createContext } from "react";

const FormContext = createContext(null);

export default FormContext;

export const { Provider, Consumer } = FormContext;
