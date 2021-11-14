import React, { useContext } from "react"
import { GlobalContext } from "../ContextManager"
import welcomeStyles from "./Welcome.module.css"

const Welcome: React.FC<{}> = () => {
  const gc = useContext(GlobalContext)

  const phase_0to3 = (
    <div className="flex-column-center">
      <img
        className={`filter-white ${
          gc.phase === 1 || gc.phase === 2 ? "" : "invisible"
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
        className={`roboto ${gc.phase === 2 ? "" : "invisible"} ${
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
      {(gc.phase >= 4 || gc.phase <= 8) && (
        <span
          className={`roboto ${
            gc.phase === 5 || gc.phase === 7 ? "" : "invisible"
          } ${welcomeStyles.welcome_span}`}
          style={{
            fontSize: "5rem",
            transitionDuration: "1250ms",
          }}
        >
          {gc.phase < 7 ? "Hello" : "I'm a fullstack dev"}
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
        {gc.phase < 4 && phase_0to3}
        {gc.phase >= 4 && phase_4}
      </div>
    </div>
  )
}

export default Welcome
