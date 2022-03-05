import useSWR from "swr"
const fetcher = url => fetch(url).then(res => res.json())

const useUser = path => {
  if (!path) {
    throw new Error("Path is required")
  }

  const url = path

  const { data, error, mutate } = useSWR(url, fetcher)

  return { user: data, error, mutate }
}

export default useUser;