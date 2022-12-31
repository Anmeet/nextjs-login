import { MongoClient } from 'mongodb'

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://amit619:amit619@cluster0.t3oml.mongodb.net/auth-demo?retryWrites=true&w=majority'
  )
  return client
}
