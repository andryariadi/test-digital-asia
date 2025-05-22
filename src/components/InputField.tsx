type InputFieldProps = {
  label?: string;
  icon?: React.ReactNode;
  passIcon?: React.ReactNode;
  openPass?: boolean;
  setOpenPass?: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  propData?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({ label, icon, passIcon, openPass, setOpenPass, type, propData, ...props }: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <span className="font-semibold text-gray-700">{label}</span>

      {/* Input  */}
      <div className="relative">
        {/* Left icon */}
        <div className="absolute inset-y-0 left-0 px-3 flex items-center pointer-events-none text-logo">{icon}</div>

        {/* Password visibility toggle (for password fields only) */}
        {type === "password" || type === "text" ? (
          <div className="absolute inset-y-0 right-0 px-3 flex items-center text-logo cursor-pointer" onClick={() => setOpenPass && setOpenPass(!openPass)}>
            {passIcon}
          </div>
        ) : null}

        {/* Input field */}
        <input
          {...propData}
          {...props}
          type={type}
          className="w-full py-3 px-3 bg-dark-400 rounded-lg outline-none border border-gray-300 focus:border-logo text-slate-950 placeholder:text-sm placeholder-gray-500 placeholder-opacity-50 transition-all duration-300 appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden"
        />
      </div>
    </div>
  );
};

export default InputField;
