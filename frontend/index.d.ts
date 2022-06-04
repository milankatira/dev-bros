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
  }

  export interface ModalFieldProps {
    title: string | any;
    open: boolean | any;
    setopen: any;
    children?: any;
    handleSubmit ?: any;
  }
}
