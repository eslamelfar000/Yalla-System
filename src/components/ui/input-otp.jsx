import * as React from "react";
import { MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const InputOTPContext = React.createContext({});

function InputOTP({
  className,
  containerClassName,
  maxLength = 6,
  value = "",
  onChange,
  ...props
}) {
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const inputRefs = React.useRef([]);

  const handleInputChange = (index, inputValue) => {
    if (inputValue.length > 1) {
      inputValue = inputValue.slice(-1);
    }

    const newValue = value.split("");
    newValue[index] = inputValue;
    const result = newValue.join("").slice(0, maxLength);

    onChange?.(result);

    // Move to next input if value was entered
    if (inputValue && index < maxLength - 1) {
      setFocusedIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      setFocusedIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleFocus = (index) => {
    setFocusedIndex(index);
  };

  const contextValue = React.useMemo(
    () => ({
      value,
      maxLength,
      focusedIndex,
      setFocusedIndex,
      handleInputChange,
      handleKeyDown,
      handleFocus,
    }),
    [
      value,
      maxLength,
      focusedIndex,
      handleInputChange,
      handleKeyDown,
      handleFocus,
    ]
  );

  return (
    <InputOTPContext.Provider value={contextValue}>
      <div
        data-slot="input-otp"
        className={cn("flex items-center gap-2", containerClassName)}
        {...props}
      >
        {Array.from({ length: maxLength }, (_, index) => (
          <React.Fragment key={index}>
            <InputOTPSlot
              index={index}
              ref={(el) => (inputRefs.current[index] = el)}
            />
            {index === 2 && <InputOTPSeparator />}
          </React.Fragment>
        ))}
      </div>
    </InputOTPContext.Provider>
  );
}

const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="input-otp-group"
    className={cn("flex items-center", className)}
    {...props}
  />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const { value, focusedIndex, handleInputChange, handleKeyDown, handleFocus } =
    React.useContext(InputOTPContext);
  const char = value[index] || "";
  const isActive = focusedIndex === index;

  return (
    <input
      ref={ref}
      data-slot="input-otp-slot"
      data-active={isActive}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      maxLength={1}
      value={char}
      onChange={(e) => {
        const { value: inputValue } = e.target;
        if (/^\d*$/.test(inputValue)) {
          handleInputChange(index, inputValue);
        }
      }}
      onKeyDown={(e) => handleKeyDown(index, e)}
      onFocus={() => handleFocus(index)}
      className={cn(
        "data-[active=true]:border-main data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-x text-sm shadow-none transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[1px] text-center",
        className
      )}
      {...props}
    />
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => (
  <div ref={ref} data-slot="input-otp-separator" role="separator" {...props}>
    <MinusIcon />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
