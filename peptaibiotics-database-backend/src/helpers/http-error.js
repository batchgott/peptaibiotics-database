export default function makeHttpError ({ statusCode=400, errorMessage }) {
    return {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode,
      data: JSON.stringify({
        success: false,
        error: errorMessage
      })
    }
  }