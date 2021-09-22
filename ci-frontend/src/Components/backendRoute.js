// Should not have a trailing '/'
// See: https://create-react-app.dev/docs/adding-custom-environment-variables/
// Default is the same behaviour as before - don't append any origin, and assume that it's served from the same as the frontend.
const backendOrigin = process.env.REACT_APP_CI_VISUALIZER_BACKEND_ORIGIN || ""

export function backendUrl(path) {
    return backendOrigin + path
}