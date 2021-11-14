import React, { useState, useEffect } from "react"
import { sleep } from "../Lib/FuncLib"
import welcomeStyles from "./Welcome.module.css"

const Welcome: React.FC<{}> = () => {
  const [phase, setPhase] = useState<number>(0)
  const [welcomeText, setWelcomeText] = useState<string>("")
  const timeControl = async () => {
    setPhase(1)
    await sleep(1250)
    setPhase(2)
    await sleep(1250)
    setPhase(3)
    await sleep(2500)
    setPhase(4)
    await sleep(1250)
    setPhase(5)
    await sleep(1250)
    setPhase(6)
    await sleep(1250)
    setPhase(7)
  }
  useEffect(() => {
    timeControl()
  }, [])

  const phase_0to3 = (
    <div className="flex-column-center">
      <img
        className={`filter-white ${
          phase === 1 || phase === 2 ? "" : "invisible"
        }`}
        src="/lizard.svg"
        alt="Logo"
        style={{
          width: "150px",
          height: "150px",
          transitionDuration: "2500ms",
          pointerEvents: "none",
        }}
      />
      <span
        className={`roboto ${phase === 2 ? "" : "invisible"} ${
          welcomeStyles.welcome_span
        }`}
        style={{
          fontSize: "2rem",
          transitionDuration: "2500ms",
        }}
      >
        Leezard
      </span>
    </div>
  )

  const phase_4 = (
    <div className="flex-column-center">
      {(phase >= 4 || phase <= 8) && (
        <span
          className={`roboto ${phase === 5 || phase === 7 ? "" : "invisible"} ${
            welcomeStyles.welcome_span
          }`}
          style={{
            fontSize: "5rem",
            transitionDuration: "1250ms",
          }}
        >
          {phase < 7 ? "Hello" : "I'm a fullstack dev"}
        </span>
      )}
    </div>
  )

  return (
    <div
      className="unselectable"
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          transform: "translate(0,-33%)",
        }}
      >
        {phase < 4 && phase_0to3}
        {phase >= 4 && phase_4}
      </div>
    </div>
  )
}

export default Welcome
