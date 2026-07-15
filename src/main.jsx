import React, { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import rootReducer from "./reducer"
import { configureStore } from "@reduxjs/toolkit"

function showFatalErrorOverlay(err, source) {
  try {
    const msg = err?.message || String(err)
    const root = document.getElementById("root")
    if (root) {
      root.innerHTML = `
        <div style="padding:16px;font-family:system-ui,sans-serif;color:#fff;">
          <h2 style="font-size:18px;margin:0 0 8px;">Fatal error (${source})</h2>
          <pre style="white-space:pre-wrap;opacity:.9;margin:0;">${msg}</pre>
        </div>
      `
    }
    // eslint-disable-next-line no-console
    console.error("Fatal error overlay:", source, err)
  } catch {
    // ignore
  }
}

window.addEventListener("error", (e) => {
  showFatalErrorOverlay(e?.error || e?.message, "window.error")
})

window.addEventListener("unhandledrejection", (e) => {
  showFatalErrorOverlay(e?.reason, "unhandledrejection")
})

class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("RootErrorBoundary caught error:", error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 16, fontFamily: "system-ui, sans-serif", color: "#fff" }}>
          <h2 style={{ fontSize: 18, marginBottom: 8 }}>App crashed during render</h2>
          <pre style={{ whiteSpace: "pre-wrap", opacity: 0.9 }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}


const store = configureStore({
  reducer: rootReducer,
})

const mountNode = document.getElementById("root")
if (!mountNode) {
  showFatalErrorOverlay('Missing #root element in index.html', "startup")
} else {
  // Visible proof the module executed (helps debug "blank screen").
  mountNode.innerHTML =
    '<div style="padding:16px;font-family:system-ui,sans-serif;color:#fff;">JS loaded, mounting React…</div>'
  createRoot(mountNode).render(
  <StrictMode>
    <RootErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </Provider>
    </RootErrorBoundary>
  </StrictMode>
)
}
