declare module "component" {
  type MyFunctionType = (arg: any) => void;
  export interface ButtonFieldProps {
    disabled?: boolean;
    text?: string | any;
    onClick?: MyFunctionType;
    type?: "submit" | "reset" | "button" | undefined;
  }
  export interface InputFieldProps {
    value?: string | any;
    onChange?: MyFunctionType;
    type?: string;
    placeholder?: string;
    text?: string | any;
    name?: string | any;
    error?: string | any;
  }

  export interface SelectFieldProps {
    error?: string | any;
    options?: any;
    name: string;
    inputLabel?: string;
    styles?: string;
    defaultValue?: string | any;
    onChange?: MyFunctionType;
  }

  export interface ModalFieldProps {
    title: string | any;
    open: boolean | any;
    setopen: any;
    children?: any;
    handleSubmit?: any;
  }
}
