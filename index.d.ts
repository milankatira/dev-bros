declare module "component" {
  type MyFunctionType = () => any;
  export interface ButtonFieldProps {
    text?: string | any;
    onClick?: MyFunctionType;
  }
  export interface InputFieldProps {
    value?: string | any;
    onChange?: MyFunctionType;
    type?: string;
    placeholder?: string;
    text?: string | any;
  }
  export interface ModalFieldProps {
    title: string | any;
    open: boolean;
    setopen: any;
    children?: any;
  }
}
