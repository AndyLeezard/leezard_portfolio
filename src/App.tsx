import React, { useState, useEffect } from "react"
import "./App.css"
import Welcome from "./Pages/Welcome"
import { GlobalContext } from "./ContextManager"
import { sleep } from "./Lib/FuncLib"
import Main from "./Pages/Main"

const intervals = [1250, 1250, 2500, 1250, 1250, 1250, 1250]

const App: React.FC<{}> = () => {
  const [phase, setPhase] = useState<number>(0)
  const timeControl = async () => {
    for (let i = 0; i < intervals.length; i++) {
      setPhase((prev) => prev + 1)
      await sleep(intervals[i])
    }
  }
  useEffect(() => {
    timeControl()
  }, [])

  return (
    <GlobalContext.Provider value={{ phase: phase }}>
      {phase < 9 && <Welcome />}
      {phase >= 5 && <Main />}
    </GlobalContext.Provider>
  )
}

export default App
