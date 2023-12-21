const API_URL = 'http://localhost:8000'
async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/v1/planets`)
  console.log(response)
  return await response.json()
}

async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/v1/launches`)
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a, b) => {
    return a.flightNumber - b.flightNumber
  })

  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/v1/launches`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(launch),
    })

  } catch (error) {
    return {
      ok: false,
    }
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try {
    return await fetch(`${API_URL}/v1/launches/${id}`, {
      method: 'DELETE',
    })
  } catch (error) {
    return {
      ok: false,
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};