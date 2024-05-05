import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MinuteInput = ({
  value,
  setValue,
}: {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<number | string>>;
}) => {
  function handleChangeText(text: number | string) {
    const notNumber = !/^[0-9]*$/.test(text as string);
    if (notNumber) {
      return;
    }
    if (value) {
      console.log(value);
    }
    setValue(text);
  }

  function checkValue() {
    if (value == "") {
      setValue("00");
    }
    if ((value as number) >= 59) {
      setValue("00");
    }

    if ((value as number) <= 0) {
      setValue("00");
    }
  }

  return (
    <input
      onMouseOver={() => checkValue()}
      onMouseLeave={() => checkValue()}
      onBlur={() => checkValue()}
      maxLength={2}
      className={`${
        value?.toString.length < 2 &&
        "text-center flex justify-center items-center"
      }" w-5 bg-transparent focus:outline-none hover:text-green-300 "`}
      type={"text"}
      value={value}
      onChange={(e) => {
        handleChangeText(e.target.value);
      }}
    />
  );
};
const HourInput = ({
  value,
  setValue,
}: {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<number | string>>;
}) => {
  function handleChangeText(text: number | string) {
    const notNumber = !/^[0-9]*$/.test(text as string);
    if (notNumber) {
      return;
    }
    if (value) {
      console.log(value);
    }
    setValue(text);
  }

  function checkValue() {
    if (value == "") {
      setValue("10");
    }
    if ((value as number) > 12) {
      setValue("10");
    }

    if ((value as number) <= 0) {
      setValue("10");
    }
  }

  return (
    <input
      onMouseOver={() => checkValue()}
      onMouseLeave={() => checkValue()}
      onBlur={() => checkValue()}
      maxLength={2}
      className={`${
        value?.toString.length < 2 &&
        "text-center flex justify-center items-center"
      }" w-5 bg-transparent focus:outline-none hover:text-green-300 "`}
      type={"text"}
      value={value}
      onChange={(e) => {
        handleChangeText(e.target.value);
      }}
    />
  );
};

const DayDisplay = ({
  day,
  setSelectedDay,
  days,
}: {
  day: string;
  days: string[];
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}) => {
  function handleInc() {
    setSelectedDay((prev) => {
      if (prev + 1 > days.length - 1) return 0;
      return prev + 1;
    });
  }

  function handleDec() {
    setSelectedDay((prev) => {
      if (prev - 1 < 0) return days.length - 1;
      return prev - 1;
    });
  }

  return (
    <div className="flex items-center bg-lightBlack  w-40 px-2 h-12   justify-between rounded-lg gap-2">
      {/* SELECTED DAY */}
      <div className="text-center  flex border border-light/40 flex-1 py-1  w-20 items-center justify-center ">
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            className="text-light/90 text-[14px] text-center font-semibold"
            key={day}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
          >
            {day}
          </motion.p>
        </AnimatePresence>
      </div>
      {/* BUTTONS */}
      <div className="">
        <motion.div
          role="button"
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.2 }}
          className="h-5 w-5 "
        >
          <ChevronUp
            className="h-full w-full cursor-pointer hover:text-green-400 transition-colors"
            onClick={handleInc}
          />
        </motion.div>
        <motion.div
          role="button"
          whileTap={{ scale: 1.2 }}
          whileHover={{ scale: 1.2 }}
          className="h-5 w-5 "
        >
          <ChevronDown
            className="h-full w-full cursor-pointer hover:text-green-400 transition-colors"
            role="button"
            onClick={handleDec}
          />
        </motion.div>
      </div>
    </div>
  );
};

const TimeDisplay = ({
  hour,
  setHour,
  minute,
  setMinute,
  suffix,
}: {
  hour: number | string;
  setHour: React.Dispatch<React.SetStateAction<number | string>>;
  minute: number | string;
  setMinute: React.Dispatch<React.SetStateAction<number | string>>;
  suffix?: string;
}) => {
  return (
    <>
      <HourInput setValue={setHour} value={hour} />
      <span>:</span>
      <MinuteInput setValue={setMinute} value={minute} />
      {suffix && (
        <p className="text-light/90 text-[14px] text-center font-semibold">
          {suffix}
        </p>
      )}
    </>
  );
};

export function TimePicker({
  startingMinute,
  setStartingMinute,
  startingHour,
  setStartingHour,
  closingMinute,
  setClosingMinute,
  closingHour,
  setClosingHour,
}: {
  startingHour: number | string;
  setStartingHour: React.Dispatch<React.SetStateAction<number | string>>;
  closingMinute: number | string;
  setClosingMinute: React.Dispatch<React.SetStateAction<number | string>>;
  closingHour: number | string;
  setClosingHour: React.Dispatch<React.SetStateAction<number | string>>;
  startingMinute: number | string;
  setStartingMinute: React.Dispatch<React.SetStateAction<number | string>>;
}) {
  return (
    <div className="flex justify-end items-center  w-40 py-1 text-light  mx-auto  ">
      <Clock className="text-light h-4 w-4 mr-1" />
      <TimeDisplay
        minute={startingMinute}
        setMinute={setStartingMinute}
        hour={startingHour}
        setHour={setStartingHour}
      />
      <span>- </span>
      <TimeDisplay
        minute={closingMinute}
        setMinute={setClosingMinute}
        hour={closingHour}
        setHour={setClosingHour}
        suffix="PM"
      />
    </div>
  );
}

function DayPicker({
  selectedDay,
  setSelectedDay,
}: {
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
}) {
  // const [days] = React.useState([
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  //   "Sunday",
  // ]);

  return (
    <div className="text-white">
      <DayDisplay
        days={days}
        setSelectedDay={setSelectedDay}
        day={days[selectedDay]}
      />
    </div>
  );
}

export default DayPicker;
