export async function GET() {
  const API_KEY = process.env.GOOGLE_API_KEY;
  const PLACE_ID = process.env.PLACE_ID;

  if (!API_KEY || !PLACE_ID) {
    return Response.json(
      { error: "Missing API key or Place ID" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${API_KEY}`,
      {
        next: { revalidate: 3600 } // cache for 1 hour
      }
    );

    const data = await res.json();

    return Response.json({
      rating: data.result?.rating || null,
      total: data.result?.user_ratings_total || 0,
      reviews: data.result?.reviews || [],
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}