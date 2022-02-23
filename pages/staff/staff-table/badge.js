export default function Badge({status}) {
  return (
    <div
      className="status hover:bg-violet-600 text-xs"
      style={{
        "background-color": (status === "danger") ? "#ffd6de" : (status === "warning") ? "#fff8ea" : "#ebf9f5",
        "color": (status === "danger") ? "#ee3158" : (status === "warning") ? "#ffa800" : "#05825f",
      }}
    >{(status === "danger") ? "nặng" : 'bình thường'}</div>
  )
}