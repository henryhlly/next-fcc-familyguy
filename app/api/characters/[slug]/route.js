/**
 * Retrieves a character and their associated quotes based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the character.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the character and their quotes, or an error response.
 */

import characters from '@/data/characters.json'
import quotes from '@/data/quotes.json'
import { NextResponse } from 'next/server'

// GET function receives two params: req (The incoming request) and params (The dynamic params taken from the request URL)
export async function GET(req, { params }) {
  try {
    // Store character data in the character var by matching the slugs
    const character = characters.data.find(item => item.slug === params.slug)

    // If no character is found throw an error response
    if (!character) {
      return new NextResponse('not found', { status: 404 })
    }

    // Get the character quotes by filtering quotes data array based on matching character_id and found character's id
    const character_quotes = quotes.data.filter(
      item => item.character_id === character.id,
    )

    // Finally return the gathered data in json format
    return NextResponse.json({
      character,
      character_quotes: character_quotes.length > 0 ? character_quotes : null,
    })
  } catch (error) {
    return new NextResponse('Internal Server Error', { status: 500 })
  }
  
}
