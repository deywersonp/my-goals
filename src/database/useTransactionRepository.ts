import { useSQLiteContext } from "expo-sqlite/next"

export type TransactionCreateDatabase = {
  amount: number
  goalId: number
}

export type TransactionResponseDatabase = {
  id: string
  amount: number
  goal_id: number
  created_at: number
}

export function useTransactionRepository() {
  const database = useSQLiteContext()

  function create(goal: TransactionCreateDatabase) {
    try {
      const statement = database.prepareSync(
        "INSERT INTO transactions (amount, goal_id) VALUES ($amount, $goal_id)"
      )

      statement.executeSync({
        $amount: goal.amount,
        $goal_id: goal.goalId,
      })
    } catch (err) {
      throw err
    }
  }

  function findLatest() {
    try {
      return database.getAllSync<TransactionResponseDatabase>(
        "SELECT * FROM transactions ORDER BY created_at DESC LIMIT 10"
      )
    } catch (err) {
      throw err
    }
  }

  function findByGoal(goalId: number) {
    try {
      const statement = database.prepareSync(
        "SELECT * FROM transactions WHERE goal_id = $goal_id"
      )

      const result = statement.executeSync<TransactionResponseDatabase>({ $goal_id: goalId })

      return result.getAllSync()
    } catch (err) {
      throw err
    }
  }

  return {
    create,
    findLatest,
    findByGoal,
  }
}