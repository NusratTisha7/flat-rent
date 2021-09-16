import './spinner.css'

export const showError = (error, msg) => {
  if (error) return <div className="alert alert-danger m-auto">{msg}</div>
}
export const showSuccess = (success, msg) => {
  if (success) return <div className="alert alert-success">{msg}</div> 
}
export const showLoading = loading => {
  if (loading) return <div className="loader">Loading...</div>
}