import { Check } from "lucide-react";
import React from "react";

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatTime(
  time: string,
  setStartTime: React.Dispatch<React.SetStateAction<string>>
) {
  let formattedTime = time.replace(/[^0-9:]/g, "");
  if (time.length + 1 == 3) {
    formattedTime = `${time}:`;
  }
  setStartTime(formattedTime);
}

function checkForErrors(
  time: string,
  setTime: React.Dispatch<React.SetStateAction<string>>
) {
  if (time.length == 3 && Number(time.replace(":", "")) > 12) {
    setTime("10:00");
    return true;
  }

  if (Number(time.replace(":", "")) > 1259) {
    setTime("12:59");
    return true;
  }
}

function DayItem({
  day,
  onSelect,
  active,
}: {
  day: string;
  onSelect: (day: string) => void;
  active: boolean;
}) {
  return (
    <button
      onClick={() => onSelect(day)}
      className={`flex-1 flex items-center justify-center gap-x-[2px] sm:gap-x-2  border-x  hover:bg-green-400 transition-colors duration-300 ease-in ${
        active ? "bg-green-500 text-light" : "text-neutral-900"
      }`}
    >
      {day}
      {active && <Check size={16} />}
    </button>
  );
}

function DayPickerBar({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  function onDaySelect(day: string) {
    const isDayInlist = selectedDays.includes(day);

    if (isDayInlist) {
      setSelectedDays((prev) => prev.filter((d) => d !== day));
      return;
    }

    setSelectedDays((prev) => {
      return [...prev, day];
    });
  }

  return (
    <div className=" w-full bg-gray-300 relative ">
      <div className="justify-between flex h-8 ">
        {days.map((day, index) => (
          <DayItem
            active={selectedDays.includes(day)}
            onSelect={(day) => onDaySelect(day)}
            key={index}
            day={day}
          />
        ))}
      </div>
    </div>
  );
}

// FIXME ALLOW ONLY AM OR PM
function TimeInput({
  time,
  setTime,
  timeOfDay,
  setTimeOfDay,
}: {
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
  timeOfDay: string;
  setTimeOfDay: React.Dispatch<React.SetStateAction<string>>;
}) {
  const timeInputRef = React.useRef<HTMLInputElement>(null);
  const timeOfdayInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (time.length == 5) {
      timeOfdayInputRef.current?.focus();
    }

    if (Number(time.replace(":", "")) > 1259) {
      setTime("12:59");
      return;
    }
  }, [time, setTime]);

  function formatTimeOfDay(timeOfDay: string) {
    if (timeOfDay.length > 2) {
      return;
    }

    const formattedTime = timeOfDay.replace(/[^a-zA-Z]/g, "").toUpperCase();

    // const formattedTime = timeOfDay.replace(/[^apm]/g, "").toUpperCase();

    setTimeOfDay(formattedTime);
  }

  return (
    <div className="flex bg-white  py-1 gap-x-2 pl-2 pr-10 rounded-sm w-fit">
      <input
        onBlur={() => checkForErrors(time, setTime)}
        ref={timeInputRef}
        onKeyDown={(e) => {
          if (e.key == "Backspace") {
            if (time.length == 3) {
              setTime(time.replace(":", ""));
            }
          }
        }}
        placeholder="10:00"
        value={time}
        // onInput={(e) => formatTime(e.currentTarget.value, setStartTime)}
        onChange={(e) => formatTime(e.target.value, setTime)}
        className="w-12 focus:outline-none "
        type="text"
      />
      <input
        placeholder="AM"
        value={timeOfDay}
        onKeyDown={(e) => {
          if (e.key == "Backspace") {
            if (timeOfDay.length == 0) {
              timeInputRef.current?.focus();
            }
          }
        }}
        onChange={(e) => formatTimeOfDay(e.target.value)}
        className="w-6  focus:outline-none"
        ref={timeOfdayInputRef}
        type="text"
        name=""
        id=""
      />
    </div>
  );
}

function MenuHoursPicker({
  startTime,
  setStartTime,
  startTimeOfDay,
  setStartTimeOfDay,
  endTime,
  setEndTime,
  endTimeOfDay,
  setEndTimeOfDay,
  selectedDays,
  setSelectedDays,
}: {
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  startTimeOfDay: string;
  setStartTimeOfDay: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
  endTimeOfDay: string;
  setEndTimeOfDay: React.Dispatch<React.SetStateAction<string>>;
  selectedDays: string[];
  setSelectedDays: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="rounded-lg p-4 sm:p-6 bg-lightBlack  max-w-2xl mx-auto space-y-6">
      <div>
        <p className="text-light">Available Days</p>
        <DayPickerBar
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
      <div className="flex justify-between gap-x-4 sm:gap-x-16 w-3/5">
        <div className="w-full ">
          <p className="text-light">Start time</p>
          <TimeInput
            time={startTime}
            setTime={setStartTime}
            timeOfDay={startTimeOfDay}
            setTimeOfDay={setStartTimeOfDay}
          />
        </div>
        <div className="w-full">
          <p className="text-light">End time</p>
          <TimeInput
            time={endTime}
            setTime={setEndTime}
            timeOfDay={endTimeOfDay}
            setTimeOfDay={setEndTimeOfDay}
          />
        </div>
      </div>
    </div>
  );
}

export default MenuHoursPicker;
