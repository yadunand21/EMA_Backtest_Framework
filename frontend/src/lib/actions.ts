import type { BacktestInput, BacktestOutput } from "./types"

async function fetch_testing_results(input: BacktestInput): Promise<BacktestOutput> {
    const response = await fetch("http://localhost:8000/testing/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
    })
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
    }
    return response.json()
}

export { fetch_testing_results }
