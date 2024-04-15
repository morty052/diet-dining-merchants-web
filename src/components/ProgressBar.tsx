function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className=" flex h-2 w-40 items-center rounded-lg border">
      <div
        style={{ width: `${progress}%` }}
        className={`h-2 rounded-lg  ${progress >= 100 ? 'bg-green-500' : 'bg-orange-400'}`}
      >
        .
      </div>
    </div>
  )
}

export default ProgressBar
