import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../../components/ui/input-otp";

function OtpInput({
  value,
  setValue,
  confirmOtp,
  isManual,
}: {
  value: string;
  setValue: (value: string) => void;
  confirmOtp: () => void;
  isManual?: boolean;
}) {
  return (
    <InputOTP
      value={value}
      onChange={(e) => setValue(e)}
      onComplete={() => {
        if (isManual) {
          return;
        }
        confirmOtp();
      }}
      maxLength={6}
      render={({ slots }) => (
        <>
          <InputOTPGroup>
            {slots.slice(0, 3).map((slot, index) => (
              <InputOTPSlot key={index} {...slot} />
            ))}{" "}
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            {slots.slice(3).map((slot, index) => (
              <InputOTPSlot key={index + 3} {...slot} />
            ))}
          </InputOTPGroup>
        </>
      )}
    />
  );
}

export default OtpInput;
