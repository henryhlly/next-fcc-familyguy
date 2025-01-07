/**
 * Retrieves a random question from the quiz.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the ID of a randomly selected question, or an error response.
 */

import questions from '@/data/quiz.json'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Find a random question in the quiz json which will produce an index no.
    const random = Math.floor(Math.random() * questions.data.length)
    return NextResponse.json({
      randomQuestion: questions.data[random].id,
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
