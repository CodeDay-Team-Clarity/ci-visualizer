// Should not have a trailing '/'
// See: https://create-react-app.dev/docs/adding-custom-environment-variables/
const backendOrigin = process.env.REACT_APP_CI_VISUALIZER_BACKEND_ORIGIN || "http://localhost:5000"

export function backendUrl(path) {
    return backendOrigin + path
}