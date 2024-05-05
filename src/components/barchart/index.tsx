import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export function BarChart({ title }: { title: string }) {
  const data = [
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
    {
      label: "",
      value: "",
    },
  ];

  return (
    <div className="flex-1 rounded-lg border border-white/50 p-2">
      <p className="text-2xl font-medium text-gray-50">{title}</p>
      <Bar
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //  @ts-expect-error
        options={{ backgroundColor: "white", borderRadius: 10 }}
        data={{
          labels: data.map((data) => data.label),
          datasets: [
            {
              label: "Revenue",
              data: [200, 300, 400, 600, 700],
              backgroundColor: "rgb(74 222 128)",
            },
            {
              label: "Sales",
              data: [90, 80, 80, 100, 300],
              backgroundColor: "white",
            },
          ],
        }}
      />
    </div>
  );
}
