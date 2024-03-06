import { useSQLiteContext } from "expo-sqlite/next"

export type GoalCreateDatabase = {
  name: string
  total: number
}

export type GoalResponseDatabase = {
  id: string
  name: string
  current: number
  total: number
}

export function useGoalRepository() {
  const database = useSQLiteContext()

  function create(goal: GoalCreateDatabase) {
    try {
      const statement = database.prepareSync(
        "INSERT INTO goals (name, total) VALUES ($name, $total)"
      )

      statement.executeSync({
        $name: goal.name,
        $total: goal.total,
      })
    } catch (err) {
      throw err
    }
  }

  function all() {
    try {
      return database.getAllSync<GoalResponseDatabase>(`
        SELECT g.id, g.name, g.total, COALESCE(SUM(t.amount), 0) AS current
        FROM goals as g
        LEFT JOIN transactions t ON t.goal_id = g.id
        GROUP BY g.id, g.name, g.total;
      `)
    } catch (err) {
      throw err
    }
  }

  function show(id: number) {
    try {
      const statement = database.prepareSync(`
        SELECT g.id, g.name, g.total, COALESCE(SUM(t.amount), 0) AS current
        FROM goals as g
        LEFT JOIN transactions t ON t.goal_id = g.id
        WHERE g.id = $id
        GROUP BY g.id, g.name, g.total;
      `)

      const result = statement.executeSync<GoalResponseDatabase>({ $id: id })

      return result.getFirstSync()
    } catch (err) {
      throw err
    }
  }

  return {
    create,
    all,
    show,
  }
}