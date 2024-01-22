import { useEffect, useRef } from "react"


const App = () => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus()
  })

  useEffect(() => {
    document.title = "my app"
  })

  // Side Effect
  return (
    <div>
      <input ref={ref} type="text" className="form-control" />
    </div>
  )
}

export default App
