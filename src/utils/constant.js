
// This is for production use
// export const BASE_URL="/api"

// This is for localhost use
// export const BASE_URL='http://localhost:5000'

// Now this will combine both,if we are using for localhost then this  use otherwise use the production level
export const BASE_URL=location.hostname==="localhost"? 'http://localhost:5000':"/api"
