import { Component, type ReactNode, type ErrorInfo } from 'react'
import styles from './EditorErrorBoundary.module.css'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class EditorErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Editor error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorState}>
          <div className={styles.errorTitle}>// Something went wrong</div>
          <div className={styles.errorMessage}>{this.state.error?.message}</div>
          <button
            className={styles.retryBtn}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            retry
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
